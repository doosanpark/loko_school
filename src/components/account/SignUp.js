import React, {useEffect, useState} from "react"
import {
    Form,
    Input,
    Checkbox,
    Button,
    Card,
    Modal,
    AutoComplete
} from 'antd';
import {Link} from "react-router-dom";
import "../../css/SignUp.less"
import axios from 'axios';

const {success} = Modal;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function SignUp(props) {
    const [form] = Form.useForm();
    const [countryList, setCountryList] = useState([]);
    const [emailValidation, setEmailValidation] = useState(true);
    const [passLength, setPassLength] = useState(0);
    const [options, setOptions] = useState([]);

    const handleSearch = value => { //국가 리스트를 가져오는 함수

        let list = []

        countryList.map((map) => {

            if(map.toLowerCase().indexOf(value)!==-1){
                list = list.concat(
                    {value: map}
                )
            }
        })

        setOptions(
            list
        );
    };



    //Register 버튼을 눌렀을 회원 정보 등록
    const onFinish = values => {
        axios.put('http://localhost:3001/account/create', {
            /*body: JSON.stringify(props)*/
            email: values.email,
            pass: values.password,
            country: values.country,
            fname: values.first_name,
            lname: values.last_name,
            agreement: values.agreement

        }).then(response => {
            console.log("res", response);
            var msg = response.data;

            //회원 등록 성공 시
            if (msg === "Succeed") {
                Modal.success({
                        content: 'Congratulations! Account has been created!',
                        onOk: () => {
                            //OK 버튼을 누르면 login 화면으로 이동
                            props.history.push("/login");
                        }
                    }
                );
            } else {
                Modal.error({
                    content: 'Account has been failed to create.',
                });
            }
        }).catch((error) => {
            Modal.error({
                content: 'Account has been failed to create.',
            });
        });
    };

    //페이지 렌더링 시에 나라 목록 가져옴
    const getCountries = () => {
        axios.get('http://localhost:3001/account/get_countries')
            .then(function (response) {
                setCountryList(response.data);
            }).catch(function (error) {
        });
    }

    useEffect(getCountries, []);

    // E-mail이 현재 등록된 상태인지 확인
    function handleBlur(e) {
        var email = e.target.value
        axios.post('http://localhost3001/account/check_email', {
            email
        })
            .then(function (response) {
                if (response.data === "enrolled") {
                    setEmailValidation(false);

                    form.setFields([
                        {
                            name: 'email',
                            errors: ['Email already has bean enrolled!'],
                        },
                    ]);
                }
            }).catch(function (error) {
            console.log("getPost error", error);
        });

    }
    return (
        <div className={"SignUp"}>
            <Card style={{width: '600px', textAlign: "left"}}>

                <Form
                    {...formItemLayout}
                    form={form}
                    style={{width: '500px', marginTop: 30}}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    {/* 이메일 입력 폼 */}
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            ({getFieldValue}) => ({
                                validator(rule, value) {
                                    if (value) {    // Input 태그에 입력된 값이 있을 때
                                        if (emailValidation) {//이메일이 등록 안된 상태일 때
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Email already has bean enrolled!');
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        {/* onBlur 시 입력한 이메일이 이미 DB에 등록되어 있는지 확인 */}
                        <Input onBlur={(e) => handleBlur(e)} onClick={() => setEmailValidation(true)}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(rule, value) {

                                    /*
                                    * 비밀번호 판별 규칙
                                    * 1. 최소 8글자여야 함.
                                    * 2. 숫자, 대소문자 및 특수문자가 모두 포함되어 있어야 함
                                    * */
                                    if (value) {
                                        var pattern1 = /[0-9]/;  // 숫자
                                        var pattern2 = /[a-z]/;  // 소문자
                                        var pattern3 = /[A-Z]/;  // 대문자
                                        var pattern4 = /[~!@#$%^&*()_+|<>?:{}]/;  // 특수문자
                                        if(passLength<8){   //8글자인지 검사
                                            return Promise.reject('The password should longer than 8 characters!');
                                        }
                                        else if (pattern1.test(value) === false) {  // 숫자 포함되어 있는지 검사
                                            return Promise.reject('The passwords should include a number!');
                                        } else if (pattern2.test(value) === false) {  // 소문자가 포함되어 있는지 검사
                                            return Promise.reject('The passwords should include a lowercase!');
                                        } else if (pattern3.test(value) === false) {  // 대문자가 포함되어 있는지 검사
                                            return Promise.reject('The passwords should include a uppercase!');
                                        } else if (pattern4.test(value) === false) {  // 특수문자가 포함되어 있는지 검사
                                            return Promise.reject('The passwords should include a special case!');
                                        }
                                    }
                                    return Promise.resolve();

                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input.Password onChange={
                            (e) => {
                                setPassLength(e.target.value.length);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(rule, value) {

                                    // 위 password에서 입력했던 내용과 일치 여부 검사
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="country"
                        label="Country"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your country!',
                            },
                        ]}
                    >
                        {/*<Input onChange={searchCountry}/>*/}
                        <AutoComplete
                            options={options}
                            onSearch={handleSearch}
                        />

                    </Form.Item>

                    <Form.Item
                        name="first_name"
                        label="First name"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="last_name"
                        label="Last name"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default SignUp
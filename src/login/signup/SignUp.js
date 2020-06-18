import React, {useEffect, useState} from "react"
import {
    Form,
    Input,
    Checkbox,
    Button,
    Card,
    Modal
} from 'antd';
import {Link} from "react-router-dom";
import "./css/SignUp.less"
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
    const [emailValidation, setEmailValidation]= useState(true);

    const onFinish = values => {
        axios.put('http://localhost:3001/create', {
            /*body: JSON.stringify(props)*/
            email: values.email,
            pass: values.password,
            country: values.country,
            fname: values.first_name,
            lname: values.last_name,
            agreement: values.agreement

        }).then(response => {
            var msg = response.data;
            if (msg === "Input Succeed") {
                console.log("res success", msg);

                Modal.success({
                        content: 'Congratulations! Account has been created!',
                        onOk: () => {
                            props.history.push("/login");
                        }
                    }
                );
            } else{
                /*console.log("res failed", msg.code);*/
                Modal.error({
                    content: 'Account has been failed to create.',
                });
            }
        }).catch((error) => {
            /*console.log("res err", error);*/
            Modal.error({
                content: 'Account has been failed to create.',
            });
        });
    };

    const getCountries = () => {
        axios.get('http://localhost:3001/get_countries')
            .then(function (response) {
                setCountryList(response.data);
                console.log("country", response.data);
            }).catch(function (error) {
            console.log("getPost error", error);
        });
    }

    useEffect(getCountries, []);

    function handleBlur(e) {
        /*console.log("value", e.target.value);*/
        var email = e.target.value
        axios.post('http://localhost:3001/check_email', {
            email
        })
            .then(function (response) {
                if(response.data==="success"){
                    setEmailValidation(false);

                    form.setFields([
                        {
                            name: 'email',
                            errors: ['Email already has bean enrolled!'],
                        },
                    ]);

                } else {
                    /*setEmailValidation(true);*/
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
                                    console.log("value", value);
                                    console.log("emailValidation", emailValidation);

                                    if (value && emailValidation) {    //입력된 값이 있을 때
                                        if(emailValidation) //이메일이 이미 등록된 상태일 때(emailValidation이 false 일 때)
                                            return Promise.resolve();
                                    }
                                    setEmailValidation(true);

                                    return Promise.reject('Email already has bean enrolled!');
                                },
                            }),
                        ]}
                    >
                        <Input onBlur={(e) => handleBlur(e)}/>
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
                                    //value.length 사용 시 뭐 validator 어쩌구 저쩌구

                                    if (value.length > 0) {
                                        var pattern1 = /[0-9]/;  // 숫자
                                        var pattern2 = /[a-z]/;
                                        var pattern3 = /[A-Z]/;
                                        var pattern4 = /[~!@#$%^&*()_+|<>?:{}]/;  // 특수문자
                                        if (value.length < 8) {
                                            return Promise.reject('Password have to longer than 8 characters!');
                                        } else if (pattern1.test(value) === false) {
                                            return Promise.reject('The passwords should include a number!');
                                        } else if (pattern2.test(value) === false) {
                                            return Promise.reject('The passwords should include a lowercase!');
                                        } else if (pattern3.test(value) === false) {
                                            return Promise.reject('The passwords should include a uppercase!');
                                        } else if (pattern4.test(value) === false) {
                                            return Promise.reject('The passwords should include a special case!');
                                        }
                                    }
                                    return Promise.resolve();
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input.Password/>
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
                        <Input/>

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

                    {/*
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>*/}

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
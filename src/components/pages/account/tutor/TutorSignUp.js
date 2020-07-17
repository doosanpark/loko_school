import React, {useEffect, useState} from "react"
import {
    Form,
    Input,
    Checkbox,
    Button,
    Card,
    Modal,
    Select,
    AutoComplete,
    Upload, Spin
} from 'antd';
import {Link} from "react-router-dom";
import "src/css/TutorSignUp.less";
import axios from 'axios';
import debounce from 'lodash/debounce';


const {Option} = Select;

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

const categoryOptions = ['Movie', 'Drama', 'Music', 'Society', 'Celebrities', 'Schoollife', 'History', 'Food', 'Business'];

function TutorSignUp(props) {
    const [form] = Form.useForm();
    const [emailValidation, setEmailValidation] = useState(true);
    const [passLength, setPassLength] = useState(0);
    const [fieldList, setFieldList] = useState([]);
    const [fileList, setFileList] = useState([]);

    //국가 리스트
    const [countryList, setCountryList] = useState([]);
    const [countries, setCountries] = useState([]);
    const filteredCountries = countryList.filter(o => !countries.includes(o));

    //언어 선택 시 필요
    const [languageOptions, setLanguageOptions] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const filteredLanguages = languageOptions.filter(o => !selectedLanguages.includes(o));

    //카테고리 선택 시 필요
    const [selectedCategories, setSelectedCategories] = useState([]);
    const filteredOptions = categoryOptions.filter(o => !selectedCategories.includes(o));


    //tag 입력 시 필요한 state
    const [tmpData, setTmpData] = useState();
    const [tagData, setTagData] = useState([]);
    const [tagValue, setTagValue] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [lastFetchId, setLastFetchId] = useState(0);


    const handleSearchFromCountries = value => { //국가 리스트를 가져오는 함수

        let list = []

        countryList.map((map) => {

            if (map.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                list = list.concat(
                    {value: map}
                )
            }
        })

        setCountries(
            list
        );
    };


    const onUploadChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };


    //Register 버튼을 눌렀을 회원 정보 등록
    const onFinish = values => {

        axios.put('http://localhost:3001/account/tutor/create', {
            /*body: JSON.stringify(props)*/
            email: values.email,
            pass: values.password,
            country: values.country,
            first_name: values.first_name,
            last_name: values.last_name,
            lang: values.language,
            category: values.category,
            tags: values.tags,
            agreement: values.agreement,
            fileList: fileList
        }).then(response => {
            console.log("res", response);
            var msg = response.data;

            //회원 등록 성공 시
            if (msg === "succeed") {
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
        axios.get('http://localhost:3001/account/tutor/get_countries')
            .then(function (response) {
                setCountryList(response.data);
            }).catch(function (error) {
        });
    }

    //페이지 렌더링 시에 언어 목록 가져옴
    const getLanguages = () => {
        axios.get('http://localhost:3001/account/tutor/get_languages')
            .then(function (response) {

                let languages = response.data;
                let lang_datas = [];
                for (let i = 0; i < languages.length; i++) {
                    lang_datas = lang_datas.concat(languages[i].english);
                }
                for (let i = 0; i < languages.length; i++) {
                    lang_datas = lang_datas.concat(languages[i].korean);
                }
                setLanguageOptions(lang_datas);

                console.log("languages", lang_datas);

            }).catch(function (error) {
            console.log("err", error);
        });
    }

    useEffect(() => {
        getCountries();
        getLanguages();
    }, []);

    // E-mail이 현재 등록된 상태인지 확인
    function handleBlur(e) {
        var email = e.target.value
        axios.post('http://localhost:3001/account/tutor/check_email', {
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

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    fetchUser = debounce(fetchUser, 800);

    function fetchUser(value) {
        setLastFetchId(lastFetchId + 1);
        const fetchId = lastFetchId;
        setTagData([]);
        setFetching(true);
        setTmpData(value);

        let tag = value;
        axios.post('http://localhost:3001/account/tutor/check_tags', {
            tag
        })
            .then(function (response) {
                setFieldList(response.data);
                console.log("data", response.data);

                const data = response.data.map(user => ({
                    value: user.tag,
                }));

                setTagData(data);
                setFetching(false);

            }).catch(function (error) {
            console.log("getPost error", error);
        });
    };

    const handleChange = value => {

        setTagValue(value);
        setTagData([]);
        setFetching(false);
    };


    return (
        <div className={"TutorSignUp"}>
            <Card>
                <div style={{width: '100rem', textAlign: "left", display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '60rem'}}>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onUploadChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </div>
                    <div style={{width: '60rem'}}>
                        <Form
                            {...formItemLayout}
                            form={form}
                            style={{width: '50rem', marginTop: 30}}
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
                                                if (passLength < 8) {   //8글자인지 검사
                                                    return Promise.reject('The password should longer than 8 characters!');
                                                } else if (pattern1.test(value) === false) {  // 숫자 포함되어 있는지 검사
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
                                <Input.Password

                                    onChange={
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
                                name="first_name"
                                label="First name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your first name!'
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="last_name"
                                label="Last name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your last name!'
                                    }
                                ]}
                            >
                                <Input/>
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

                                <Select
                                    mode="multiple"
                                    placeholder="Select Countries"
                                    value={countries}
                                    onChange={items => setCountries(items)}
                                >
                                    {
                                        filteredCountries.length > 248 ?
                                            filteredCountries.map(item => (
                                                <Select.Option key={item} value={item}>
                                                    {item}
                                                </Select.Option>
                                            )) : ('')
                                    }
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name="language"
                                label="Possible Language"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select languages!!'
                                    }
                                ]}
                            >
                                <Select
                                    mode="tags"
                                    placeholder="Select languages"
                                    value={selectedLanguages}
                                    onChange={items => setSelectedLanguages(items)}
                                >
                                    {
                                        filteredLanguages.length > 214 ?
                                            filteredLanguages.map(item => (
                                                <Select.Option key={item} value={item}>
                                                    {item}
                                                </Select.Option>
                                            )) : ('')
                                    }
                                </Select>

                            </Form.Item>
                            <Form.Item
                                name="category"
                                label="Category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select categories!'
                                    }
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Select your Specialties!"
                                    value={selectedCategories}
                                    onChange={items => setSelectedCategories(items)}
                                >
                                    {
                                        filteredOptions.length > 5 ?
                                            filteredOptions.map(item => (
                                                <Select.Option key={item} value={item}>
                                                    {item}
                                                </Select.Option>
                                            )) : ('')
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="tags"
                                label="Tags"
                            >
                                <Select
                                    mode="tags"
                                    autoClearSearchValue={true}
                                    value={tagValue}
                                    placeholder="Select your interest"
                                    notFoundContent={tmpData}
                                    filterOption={false}
                                    onSearch={fetchUser}
                                    onChange={handleChange}
                                    style={{width: '100%'}}
                                >
                                    {tagData.map(d => (
                                        <Option key={d.value}>{d.text}</Option>
                                    ))}
                                </Select>
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
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default TutorSignUp
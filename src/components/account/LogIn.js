import React, {useState} from 'react'
import '../../css/LogIn.less'
import {Card, Carousel, Input, Form, Checkbox, Button, Divider, Modal} from "antd";
import {Link} from "react-router-dom"
import axios from "axios";

import {connect} from 'react-redux';
import {loginSuccess} from "../../redux/actions/authentication";

import PropTypes from 'prop-types';
import {AUTH_LOGIN_FAILURE} from "../../redux/actions/ActionTypes";

const layout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 194,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 7,
        span: 14,
    },
};

function LogIn(props) {

    const [modalState, setModalState] = useState(true)
    const [userName, setUserName] = useState("")

    const onFinish = values => {    //Log In 버튼을 눌렀을 때
        axios.post('http://localhost:3001/account/login', {
            /*body: JSON.stringify(props)*/
            email: values.email,
            pass: values.password
        }).then(response => {
            var msg = response.data;

            //입력한 id와 비밀번호가 있을 경우, redux에 로그인 정보 저장.
            if (msg !== []) {
                setUserName(msg[0].first_name);
                props.loginSucceed(msg[0].first_name)

                //로그인 성공 시 Modal(성공) 출력
                Modal.success({
                    content: "Welcome to Loko School!",
                    onOk: () => {
                        props.history.push("/");
                    }
                });
            } else {
                //로그인 실패 시 Modal(에러) 출력
                Modal.error({
                    content: 'Log in has been failed.',
                });
            }

        }).catch((error) => {
            //로그인 실패 시 Modal(에러) 출력
            Modal.error({
                content: 'Log in has been failed.',
            });
        });
    };


    return (
        <div className={"LogIn"}>

            <div className={"LogIn__Form"}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    style={{marginTop: '24px', width: 600}}
                >
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input style={{width: "350px"}}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password style={{width: "350px"}}/>
                    </Form.Item>

                    <Form.Item {...tailLayout} style={{}} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                        <Divider type={"vertical"}/>
                        <Link to={"/find_account"}>
                            <Button type="link">
                                Forgot E-mail or Password?
                            </Button>
                        </Link>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="Log In" style={{marginRight: "10px"}}>
                            Log In
                        </Button>
                        <Link to={"/signup"}>
                            <Button type="link" style={{marginLeft: "10px"}}>
                                Sign Up
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginSucceed: (userName) => {
            return dispatch(loginSuccess(userName));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
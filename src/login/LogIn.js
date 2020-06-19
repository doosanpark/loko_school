import React from 'react'
import './css/LogIn.less'
import {Card, Carousel, Input, Form, Checkbox, Button, Divider, Modal} from "antd";
import {Link} from "react-router-dom"
import axios from "axios";

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

    const onFinish = values => {
        axios.post('http://localhost:3001/check_login', {
            /*body: JSON.stringify(props)*/
            email: values.email,
            pass: values.password
        }).then(response => {

            var msg = response.data;
            if (msg === "success") {
                props.history.push("/");
            } else {
                Modal.error({
                    content: 'Account has been failed to create.',
                });
            }

        }).catch((error) => {
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
                            <Link to={"/findaccount"}>
                                <Button type="link" >
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

export default LogIn;
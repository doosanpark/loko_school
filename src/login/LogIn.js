import React from 'react'
import './css/LogIn.less'
import {Card, Carousel, Input, Form, Checkbox, Button, Divider} from "antd";
import {Link} from "react-router-dom"

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

function LogIn() {

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
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
                        onFinishFailed={onFinishFailed}
                        style={{marginTop: '24px'}}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input style={{width: "300px"}}/>
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
                            <Input.Password style={{width: "300px"}}/>
                        </Form.Item>

                        <Form.Item {...tailLayout} style={{}} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                            <Divider type={"vertical"}/>
                            <Link to={"/findaccount"}>
                                <Button type="link" >
                                    Forgot Email or Password?
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
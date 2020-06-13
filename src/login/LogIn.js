import React, {useState} from 'react'
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
                <Card>
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

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" style={{marginRight: "10px"}}>
                                Submit
                            </Button>
                            <Link to={"/signin"}>
                                <Button type="link" style={{marginLeft: "10px"}}>
                                    Sign In
                                </Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <div className={"LogIn__Ad"}>
                <Carousel autoplay>
                    <div>
                        <h3>1</h3>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default LogIn;
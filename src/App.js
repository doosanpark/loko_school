import React, {useEffect, useState} from 'react';
import './App.less';

import {Divider, Menu, Button} from 'antd';
import 'antd/dist/antd.less';

import {Link, BrowserRouter, Route} from 'react-router-dom'
import Home from "./home/Home";
import Process from "./process/Process";
import LogIn from "./login/LogIn";
import SignUp from "./login/signup/SignUp";
import Footer from "./footer/Footer";
import MyClass from "./myclass/MyClass";


function App() {

    const [current, setCurrent] = useState('home');

    /* useEffect(console.log(match.params.id), []);*/

    function handleClick(e) {
        /*console.log('click ', e);*/
        setCurrent(e.key);
    };
    useEffect(() => {
        /*console.log("asd");*/
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <div className={"App__Header"}>

                    <div className={"App__Header_logo"}>
                        LOKO<br/>SCHOOL
                    </div>
                    <div style={{width: '100%', textAlign: 'right'}}>

                        <div style={{marginRight: 30}}>
                            <Link to={"/login"}>
                                <Button style={{fontSize: 15, color: "primary"}} type={"link"} onClick={() => {
                                    setCurrent("");
                                }}>Log In</Button>
                            </Link>
                            <Divider style={{height: 20}} type={"vertical"}/>
                            <Link to={"/myclass"}>
                                <Button style={{fontSize: 15, color: "primary"}} type={"link"}>My Class</Button>
                            </Link>
                        </div>

                        {/* localhost:3000/login 이런 식으로 바로 들어올 경우 표기가 안되는 문제가 있음 */}
                        <Menu
                            selectable={false}
                            onClick={handleClick}
                            selectedKeys={[current]}
                            className={"App__Menu"}
                            style={{
                                width: '100%',
                                textAlign: "right",
                                fontSize: '20px',
                                fontWeight: "bold",
                                paddingRight: "24px"
                            }}
                            mode="horizontal">

                            <Menu.Item
                                style={{marginRight: "5%"}}
                                key="home">
                                <Link to={"/"}>
                                    Home
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                                style={{marginRight: "5%"}}
                                key="process">
                                <Link to={"/process"}>
                                    Process
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                                style={{marginRight: "5%"}}
                                key="articles">
                                <Link to={"/articles"}>
                                    Articles
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                                style={{marginRight: "5%"}}
                                key="price">
                                <Link to={"/price"}>
                                    Price
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                                key="about_us">
                                <Link to={"/about_us"}>
                                    About Us
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                {/*<Divider style={{margin: '15px'}}/>*/}

                <Route path={"/process"} component={Process}/>
                <Route path={"/myclass"} component={MyClass}/>
                <Route path={"/login"} component={LogIn}/>
                <Route path={"/signup"} component={SignUp}/>
                <Route exact path={"/"} component={Home}/>

            </BrowserRouter>
            <Footer/>
        </div>
    );
}

export default App;

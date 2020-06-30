import React, {useEffect, useState} from 'react';
import './App.less';

import {Divider, Menu, Button} from 'antd';
import 'antd/dist/antd.less';

import {
    Link,
    Route,
    useLocation
} from "react-router-dom";

import {connect} from 'react-redux';

import Home from "./components/home/Home";
import Process from "./components/process/Process";
import LogIn from "./components/account/LogIn";
import SignUp from "./components/account/SignUp";
import Footer from "./components/footer/Footer";
import MyClass from "./components/myclass/MyClass";
import Counter from "./components/Counter";
import HomeButton from "./components/HomeButton";



function App(props) {

    const [current, setCurrent] = useState("/home");

    /* useEffect(console.log(match.params.id), []);*/

    function usePageViews() {
        let {location} = useLocation();
        React.useEffect(() => {
            console.log("location", location);
        }, [location]);
    }
    function handleClick(e) {
        /*console.log('click ', e);*/
        setCurrent(e.key);
    };
    usePageViews();
    return (
        <div className="App">

                <div className={"App__Header"}>
                    {/* 홈페이지 상단 로고 구현. 클리 시 home으로 이동. */}
                    <Link to={"/"}>
                        <div className={"App__Header_logo"} onClick={()=>{setCurrent("/home")}}>
                            LOKO<br/>SCHOOL
                        </div>
                    </Link>
                    <div style={{width: '100%', textAlign: 'right'}}>

                        <div style={{marginRight: 30}}>
                            <Link to={"/login"}>
                                <Button style={{fontSize: 15, color: "primary"}} type={"link"} onClick={() => {
                                    setCurrent("");
                                }}>{props.status==="SUCCESS"? "Log Out": "Log In"}</Button>
                            </Link>
                            <Divider style={{height: 20}} type={"vertical"}/>
                            <Link to={"/myclass"}>
                                <Button style={{fontSize: 15, color: "primary"}} type={"link"}>My Class</Button>
                            </Link>
                        </div>

                        {/* localhost:3000/login 이런 식으로 url을 입력하여 페이지를 렌더링할 경우 메뉴 탭이 반영 안되는 문제가 있음 */}
                        {/* Header의 Menu 탭 구현 */}
                        <Menu
                            selectable={false}
                            onClick={handleClick}
                            selectedKeys={current}
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
            <Footer/>

        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        status: state.authentication.login.status
    }
}

export default connect(mapStateToProps)(App);
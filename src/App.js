import React, {useEffect, useState} from 'react';
import './App.less';

import {Divider, Menu, Button, Modal} from 'antd';
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
import StudentSignUp from "./components/account/student/StudentSignUp";
import Footer from "./components/footer/Footer";
import MyClass from "./components/myclass/MyClass";
import {logOut} from "./redux/actions/authentication";
import Reservation from "./components/reservation/Reservation";
import TutorSignUp from "./components/account/tutor/TutorSignUp";


function usePageViews() {
    let location = useLocation();
    return (location.pathname)
}


function App(props) {

    const [current, setCurrent] = useState(usePageViews());
    const [modalState, setModalState] = useState(false);


    function confirmLogOut(logOutState) {
        Modal.confirm({
            content: ' 로그아웃 하시겠습니까?',
            onOk: () => {
                //OK 버튼을 누르면 login 화면으로 이동

                if(logOutState==="session"){
                    sessionStorage.removeItem("id");
                    sessionStorage.removeItem("pass");
                    sessionStorage.removeItem("login_status");
                    props.logOut();
                    setModalState(false);
                }
                if(logOutState==="local"){
                    localStorage.removeItem("id");
                    localStorage.removeItem("pass");
                    localStorage.removeItem("login_status");
                    props.logOut();
                    setModalState(false);
                }
            },
            okText: '확인',
            cancelText: '취소',
        })
    }

    return (
        <div className="App">

            <div className={"App__Header"}>
                {/* 홈페이지 상단 로고 구현. 클리 시 home으로 이동. */}
                <Link to={"/"}>
                    <div className={"App__Header_logo"} onClick={() => {
                        setCurrent("/home")
                    }}>
                        LOKO<br/>SCHOOL
                    </div>
                </Link>
                <div style={{width: '100%', textAlign: 'right'}}>

                    <div style={{marginRight: 30}}>
                        {
                            localStorage.getItem("login_status") ? (
                                <Button style={{fontSize: 15, color: "primary"}} type={"link"} onClick={() => {
                                    confirmLogOut("local");
                                }}>Log Out</Button>
                            ) : (
                                sessionStorage.getItem("login_status") ? (

                                    <Button style={{fontSize: 15, color: "primary"}} type={"link"} onClick={() => {
                                        confirmLogOut("session");
                                    }}>Log Out</Button>

                                ) : (
                                    <Link to={"/login"}>
                                        <Button style={{fontSize: 15, color: "primary"}} type={"link"}>Log In</Button>
                                    </Link>
                                )
                            )}


                        <Divider style={{height: 20}} type={"vertical"}/>
                        <Link to={"/myclass"}>
                            <Button style={{fontSize: 15, color: "primary"}} type={"link"}>My Class</Button>
                        </Link>
                    </div>

                    {/* localhost:3000/login 이런 식으로 url을 입력하여 페이지를 렌더링할 경우 메뉴 탭이 반영 안되는 문제가 있음 */}
                    {/* Header의 Menu 탭 구현 */}

                    <Menu
                        selectedKeys={current}
                        onClick={() => setCurrent(usePageViews)}
                        className={"App__Menu"}
                        style={{
                            width: '100%',
                            textAlign: "right",
                            fontSize: '2rem',
                            fontWeight: "bold",
                            paddingRight: "2.4rem"
                        }}
                        mode="horizontal">

                        <Menu.Item
                            style={{marginRight: "5%"}}
                            key="/home">
                            <Link to={"/home"}>
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
            <Route path={"/tutor/signup"} component={TutorSignUp}/>
            <Route path={"/signup"} component={StudentSignUp}/>
            <Route path={"/reservation"} component={Reservation}/>
            <Route path={"/home"} component={Home}/>
            <Route exact path={"/"} component={Home}/>
            <Footer/>

        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
        auth: state.authentication.login.auth

    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            return dispatch(logOut());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
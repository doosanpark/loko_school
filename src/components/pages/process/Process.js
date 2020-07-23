import React, {useEffect, useState} from 'react';
import yuri_1 from './img/yuri_1.png';
import yuri_2 from './img/yuri_2.png';
import yuri_3 from './img/yuri_3.png';
import yuri_4 from './img/yuri_4.png';
import teacher from 'src/css/img/teacher.png';
import couple from 'src/css/img/couple.png';

import 'src/css/Process.less'
import 'antd/dist/antd.less';
import {Card, Input, Carousel, Select, AutoComplete} from 'antd';
import axios from "axios";

const OPTIONS = ['Movie', 'Drama', 'Music', 'Society', 'Celebrities', 'Schoollife', 'History', 'Food', 'Business'];

function Process() {

    const [showPaypal, setShowPaypal] = useState(false);
    const [tutorInfo, setTutorInfo] = useState();
    const [selectedTags, setSelectedTags] = useState([]);

    const filteredOptions = OPTIONS.filter(o => !selectedTags.includes(o));


    //언어 선택 시 필요
    const [languageOptions, setLanguageOptions] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const filteredLanguages = languageOptions.filter(o => !selectedLanguages.includes(o));

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

                /*console.log("languages", lang_datas);*/

            }).catch(function (error) {
            console.log("err", error);
        });
    }

    useEffect(() => {
        getLanguages();
        axios.post('http://localhost:3001/process/get_tutor_info', {})
            .then(function (response) {
                console.log("response.data", response.data);
                setTutorInfo(response.data);
            }).catch(function (error) {
        });
    }, []);

    function showTutorInfo() {
        return ( <div></div>
            /*tutorInfo === undefined ? "" : (
                tutorInfo[0].map(
                    info =>
                        <div className={'Process__Grid'}>
                            <Card>
                                <img
                                    src={yuri_1}
                                    width={'100%'}
                                /> <br/>

                                <span style={{fontWeight: 'bold'}}>{info.first_name} {info.last_name}<br/></span>
                                {/!*{info.first_name} {info.last_name}<br/>*!/}
                                {info.country}<br/>
                            </Card>
                        </div>
                ))*/
        )
    }

    return (
        <div className={"Process"}>

            <div className={"Process__Filter"}>
                <Select
                    style={{ width: '100px' }}
                    placeholder="Category"
                    value={selectedTags}
                    onChange={items => setSelectedTags(items)}
                >
                    {
                        filteredOptions.length > 5?
                            filteredOptions.map(item => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            )) : ('')
                    }
                </Select>
                <Select
                    mode="multiple"
                    style={{width: '100px'}}
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
            </div>
            <div className={"Process__TutorList"}>
                {showTutorInfo()}
            </div>
        </div>
    )
}

export default Process;
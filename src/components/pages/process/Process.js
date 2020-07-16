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

    useEffect(() => {
        axios.post('http://localhost:3001/process/get_tutor_info')
            .then(function (response) {
                setTutorInfo(response.data);
            }).catch(function (error) {
        });
    }, []);

    function showTutorInfo() {
        return (
            tutorInfo === undefined ? "" : (
                tutorInfo[0].map(
                    info =>
                        <div className={'Process__Grid'}>
                            <Card>
                                <img
                                    src={yuri_1}
                                    width={'100%'}
                                /> <br/>
                                {info.country}<br/>
                                {info.first_name}<br/>
                                {info.last_name}
                            </Card>
                        </div>
                ))
        )
    }

    return (
        <div className={"Process"}>

            <div className={"Process__Filter"}>
                <AutoComplete
                    style={{width: '100px'}}
                    defaultValue={"K-POP"}
                    /*options={options}
                    onSearch={handleSearchFromFields}*/
                />
                <Select
                    mode="multiple"
                    style={{ width: '100px' }}
                    placeholder="Select your Specialties"
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

            </div>
            <div className={"Process__TutorList"}>
                {showTutorInfo()}
            </div>
        </div>
    )
}

export default Process;
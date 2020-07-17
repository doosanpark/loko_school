import React, {useState} from 'react';
import {Tag, Input, Tooltip, Upload, Button} from 'antd';
import axios from 'axios';

function log(e) {
    console.log(e);
}

function preventDefault(e) {
    e.preventDefault();
    console.log('Clicked! But prevent default.');
}

function MyClass() {

    const [fileList, setFileList] = useState([]);
    const meta = {
        title: 'title 1',
        contents: 'contents 1',
    }

    const beforeUpload = (file) => {
        setFileList(fileList.concat(file));
        return false;
    }

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach(file => formData.append('files', file));

        // FormData의 append의 경우 value에 매개변수로 JSON Object를 받지 않음.
        // JSON Object의 값들을 일일히 string으로 설정해주어야함.
        // string 데이터 입력(metadata)
        for(let key in meta) {
            formData.append(key, meta[key]);
        }

        axios.post('http://localhost:3001/apis/board', formData, {
            header: { 'Content-Type': 'multipart/form-data'}
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

    const onUploadChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    return (
        <div>
           {/*
           name: 'files',
            multiple: true,
            action: 'http://localhost:5000/api/board/',
            beforeUpload: file => {
            setFileList(fileList.concat(file));
            return false;	// 파일 선택시 바로 업로드 하지 않고 후에 한꺼번에 전송하기 위함
        },
            fileList,*/}
            <Upload
                action="http://localhost:3001/apis/board"
                listType="picture-card"
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={onUploadChange}
                onPreview={onPreview}
            >
                {fileList.length < 1 && '+ Upload'}
            </Upload>
            <Button onClick={handleUpload}>Upload</Button>

        </div>
    )
}


export default MyClass


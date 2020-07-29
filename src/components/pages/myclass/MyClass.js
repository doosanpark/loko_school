import React, {useState} from 'react';
/*import {Tag, Input, Tooltip, Upload, Button} from 'antd';*/
import {Upload, Button} from 'antd';
import axios from 'axios';

function MyClass() {
    const [fileList, setFileList] = useState([ ]);
    const [upLoading, setUpLoading] = useState(false);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    function handleUpload() {

        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files', file);
        });

        setUpLoading(true);

        axios.post("/server/apis/boards", formData, {
            header: { 'Content-Type': 'multipart/form-data'}
        });


    };

    function beforeUpload(file){
        setFileList(fileList.concat(file));
        return false;
    }

    const func = {

        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
        },
        fileList,
    };

    return (
        <div>
            <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={onChange}
            >
                {fileList.length < 1 && '+ Upload'}
            </Upload>
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}


export default MyClass


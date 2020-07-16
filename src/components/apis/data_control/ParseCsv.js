import React from 'react';
import Papa from 'papaparse';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';

class ParseCsv extends React.Component {
    constructor() {
        super();
        this.state = {
            csvfile: undefined
        };
        this.updateData = this.updateData.bind(this);
    }

    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };

    importCSV = () => {
        const { csvfile } = this.state;
        Papa.parse(csvfile, {
            complete: this.updateData,
            header: true
        });
    };

    updateData(result) {
        var data = result.data;
        console.log(data);

        axios.put('http://localhost:3001/process/lang_data', {
            lang_data: data
        }).then(response => {
            console.log("res", response);
        }).catch((error) => {

        });


    }

    render() {
        return (
            <div className="App">
                <h2>Import CSV File!</h2>
                <input
                    className="csv-input"
                    type="file"
                    ref={input => {
                        this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                />
                <p />
                <button onClick={this.importCSV}> Upload now!</button>
            </div>
        );
    }
}

export default ParseCsv;
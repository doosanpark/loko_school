import React from 'react';
import Papa from 'papaparse';
import {withRouter} from 'react-router-dom';
import axios from "axios";

class DataController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        this.getCsvData();
    }

    fetchCsv() {
        return fetch('./data/lang_data.csv').then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }

    getData(result) {
        this.setState({data: result.data});
    }

    async getCsvData() {
        let csvData = await this.fetchCsv();

        Papa.parse(csvData, {
            complete: this.getData
        });
    }

    onClick= () => {
        let data = this.state.data;
        axios.post('http://localhost:3001/process/lang_data', {
            data
        })
            .then(function (response) {
                console.log("data", response.data);
            }).catch(function (error) {
            console.log("getPost error", error);
        })

    }

    render() {

        return (
            <section className="data-controller">
               <button onClick={this.onClick}>zeze</button>
            </section>
        );
    }
}

export default withRouter(DataController);
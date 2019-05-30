import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Selectfield from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ImageResults from '../image-results/ImageResults';

class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api/',
        apiKey: '9682397-bec1921c1ca3177a6914dc63b',
        images: []
    }
    onTextChange = e => {
        const val = e.target.value;
        const {apiUrl, apiKey, searchText, amount} = this.state;
        this.setState({[e.target.name]: val}, 
            () => {
                if(val === '') {
                    this.setState({images: []})
                }else {
                    axios.get(`${apiUrl}?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}`)
                    .then(res => this.setState({images: res.data.hits}))
                    .catch(err => console.log(err))
                }
            });
    }
    onAmountChange = (e, index, value) => this.setState({amount: value});
    render(){
        return (
            <div>
                <TextField name = "searchText" value = {this.state.searchText} onChange = {this.onTextChange} floatingLabelText="Search For Images" fullWidth={true} />
                <Selectfield name="amount" floatingLabelText="Amount" value={this.state.amount} onChange={this.onAmountChange} >
                    <MenuItem value={5} primaryText="5"/>
                    <MenuItem value={10} primaryText="10"/>
                    <MenuItem value={15} primaryText="15"/>
                    <MenuItem value={30} primaryText="30"/>
                    <MenuItem value={50} primaryText="50"/>
                </Selectfield>
                <br/>
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
            </div>
        );
    }
}

export default Search; 
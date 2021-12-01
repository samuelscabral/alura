import React, { Component } from 'react';
import {browserHistory} from  'react-router';

export default class Logout extends Component {

    componentWillMount(){
        localStorage.removeItem('auth-token');
        this.props.history.push('/');
    }

    render(){
        return null;
    }
}
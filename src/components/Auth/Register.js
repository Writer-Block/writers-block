import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUserData} from '../../redux/reducer'

class Register extends Component{
    constructor(){
        super()

        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }
    //Setting state
    handleEmail = (e) => {
        this.setState({ email: e.target.value})
    }
    
    handleUsername = (e) => {
        this.setState({   username: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value})
    }
}
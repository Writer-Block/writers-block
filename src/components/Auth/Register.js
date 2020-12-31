import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'
import './Register.css'


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

    registerUser = async (e) => {
        e.preventDefault()
        const {email, username, password} =this.state;
        try {
            const user = await axios.post('auth/register', {email, username, password})
            this.props.getUser(user.data.user_id)
            this.props.history.push('/dash')
        }catch(err){
        alert(err.response.request.response)
        }
    }
    goToLogin = async (e) => {
        this.props.history.push('/')
    }

    render(){
        return (
            <div className='register'>
                <form className='form'>
                
                    <input className='input'
                        name= 'Email'
                        value= {this.email}
                        placeholder='Email'
                        onChange={this.handleEmail}
                        />
                    <input className='input'
                        name='username'
                        value={this.username}
                        placeholder='Username'
                        onChange={this.handleUsername}
                        />
                    <input className='input'
                        name='password'
                        type ='password'
                        value={this.password}
                        placeholder='Enter Password'
                        onChange={this.handlePassword}
                        />
                        <button onClick={this.registerUser} className='registerButton'>Register</button>
                        
                        
                </form>
                <div className='space'>
            
            <img className='authLogo' alt='logo' src='https://cdn.discordapp.com/attachments/789196106965319750/794260091326824499/writersblocklogo.png'></img>
            <button onClick={this.goToLogin} className='toLogin'>Already have an account?</button>
            </div>
            </div>
        )
    }
}


export default connect(null, {getUser})(Register)
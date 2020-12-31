import axios from 'axios'
import React, {Component} from 'react'
import {getUser} from '../../redux/reducer'
import {connect} from 'react-redux'
import './Login.css'


class Login extends Component{
    constructor(){
        super()

        this.state = {
            username: '',
            password: '',
            
        }
    }

    handleUsername = (e) => {
        this.setState({   username: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value})
    }

    loginUser = async (e) => {
        e.preventDefault()
        const {username, password} = this.state
        try {
            const user = await axios.post('/auth/login', {username, password})
            this.props.getUser(user.data.user_id)
            console.log(user.data)
            this.props.history.push('/dash')
        }catch(err){
            alert(err.response.request.response)
        }    
    }
    
    goToRegister = async () => {
        this.props.history.push('/register')
    }

    render(){
        return (
        <div className = 'login'>
            
            <form className ='form'>
            
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
            <button onClick={this.loginUser} className='loginButton'>Login</button>
            
            </form>
            <div className='space'>
            
            <img className='authLogo' alt='logo' src='https://cdn.discordapp.com/attachments/789196106965319750/794260091326824499/writersblocklogo.png'></img>
            <button onClick={this.goToRegister} className='toRegister'>Need an account?</button>
            </div>
        </div>
        )
    }
}

export default connect(null, {getUser})(Login)
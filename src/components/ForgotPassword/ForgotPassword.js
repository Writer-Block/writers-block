import axios from 'axios'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './ForgotPassword.css'
import '../Auth/Login.css'


class ForgotPassword extends Component{
    constructor(){
        super()

        this.state = {
            email: "",
            toggle: false
        }
    }

    handleEmail = (e) => {
        this.setState({   email: e.target.value})
    }

    sendLink = async () => {
        // send axios request passing email from state as body
        await axios.post('/forgotpassword', {email: this.state.email});
        this.setState({
            toggle: true
        })
    }

    render(){
        return (
            <div className = 'ForgotPassword'>
                <div className='form passwordform'>
                    <p className='passwordp'>{this.state.toggle? "Email has been sent" :"An email will be sent to reset your password"}</p>
                    <input className='input' placeholder="Email" onChange={this.handleEmail}></input>
                    <button className='loginButton passwordbutton' onClick={this.sendLink}>Send Link</button>
                </div>

                <div className='space'>
                    <img className='authLogo' alt='logo' src='https://cdn.discordapp.com/attachments/789196106965319750/794260091326824499/writersblocklogo.png'></img>
                    <Link className='backToLogin' to='/'>Back to Login</Link>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;
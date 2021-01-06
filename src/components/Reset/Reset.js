import axios from 'axios'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Reset.css'
import '../Auth/Login.css'


class Reset extends Component{
    constructor(){
        super()

        this.state = {
            password: "",
            newuser: {},
            toggleLogin: true
            
        }
    }

    handlePassword = (e) => {
        this.setState({   password: e.target.value})
    }

    resetPassword = async () => {
        const updateduser = await axios.put(`/resetpassword/${this.props.match.params.resetid}`, {password: this.state.password});
        console.log(updateduser);
        this.setState({
            newuser: updateduser.data[0],
            toggleLogin: false
        })
    }

    render(){
        return (
            <div className = 'ForgotPassword'>
                <div className='form passwordform'>
                    <p className='passwordp'>{this.state.toggleLogin ? "Update Password" : <Link className='backToLogin' to="/">Return to Login</Link>}</p>
                    <p className={this.state.toggleLogin ? 'hidePassText' : 'passwordp'}>{this.state.newuser ? "Password has been updated" : "This Link is not valid."}</p>
                    <input className={this.state.toggleLogin ? 'input' : " hidePassText"} placeholder="New Password" onChange={this.handlePassword}></input>
                    <button className={this.state.toggleLogin ? 'loginButton passwordbutton' : "hidePassText"} onClick={this.resetPassword}>Update</button>
                </div>

                <div className='space'>
                    <img className='authLogo' alt='logo' src='https://cdn.discordapp.com/attachments/789196106965319750/794260091326824499/writersblocklogo.png'></img>
                    <Link className='backToLogin' to='/'>Back to Login</Link>
                </div>
            </div>
        )
    }
}

export default Reset;
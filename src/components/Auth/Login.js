import axios from 'axios'
import React, {Component} from 'react'
import {getUser} from '../../redux/reducer'
import {connect} from 'react-redux'


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
            <form>
            <input 
                name='username'
                value={this.username}
                placeholder='Username'
                onChange={this.handleUsername}
                />
            <input 
                name='password'
                type ='password'
                value={this.password}
                placeholder='Enter Password'
                onChange={this.handlePassword}
                />
            <button onClick={this.loginUser} className='registerBtn'>Login</button>
            <button onClick={this.goToRegister}>Need an acount?</button>
            </form>
        )
    }
}

export default connect(null, {getUser})(Login)
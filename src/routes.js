import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Register from "./components/Auth/Register"
import Login from './components/Auth/Login'
import Dash from './components/Dash/Dash'
import UserPosts from './components/UserPosts/UserPosts'
import Post from './components/Post/Post'
import CreatePost from './components/CreatePost/CreatePost'



export default (
    <Switch>
        <Route exact path='/' component = {Login}/>
        <Route path='/register' component = {Register}/>
        <Route path='/dash' component = {Dash}/>
        <Route path='/userposts' component = {UserPosts}/>
        <Route path='/post' component = {Post}/>
        <Route path='/createpost' component = {CreatePost} />
    </Switch>
)
import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './Dash.css'
import {Link} from 'react-router-dom'

class Dash extends Component{
    constructor(){
        super()

        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        this.getAllPosts()
    }

    //# The function for getting all posts
    getAllPosts = async () => {
        try{
            const posts = await axios.get('/dash/posts')
            this.setState({
                posts: posts.data
            })
            console.log(this.state.posts)
        } catch(err){
            console.log(err)
        }
    }

    render(){
        const mappedPosts = this.state.posts.map((post, index) => {
            return(
                <div className='dash-background'>
                <div className='container' key={index} >
                    <h2> What you've written so far </h2>
                        <div className='post-container'>
                            <h5>{post.content}</h5>
                        </div>
                        <div className='link-box'>
                    <Link style={{textDecoration: "none", color: "white"}} to={`/post/${post.post_id}`}>Go To Post</Link>
                    </div>
                </div>
                </div>
            )
        })
        return(
            <div>{mappedPosts}</div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Dash)
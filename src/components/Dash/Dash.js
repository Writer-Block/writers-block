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
        } catch(err){
            console.log(err)
        }
    }

    render(){
        const mappedPosts = this.state.posts.map((post, index) => {
            return(
                
                <div className='dash-background' key={index} >
                <div className='container' >
                    <div className='post-container'>
                        <h5>{post.content}</h5>
                    </div>
                    <div className='username'>
                        <div className='link-box'>
                        <Link style={{textDecoration: "none", color: "white"}} to={post.user_id === this.props.user_id ? `/edit/${post.post_id}` : `/post/${post.post_id}`}>Go To Post</Link>
                    </div>
                        <h3> - {post.username} </h3>
                    </div>
                        <hr className='seperating-line'></hr>
                        <br></br>
                    </div>
                </div>
                
            )
        })
        return(
            <div className='push'>
            <div>{mappedPosts}</div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Dash)
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
                <div key={index} >
                    <h2> Your Writing:
                        <p>{post.content}</p>
                    </h2>
                    <Link to={`/post/${post.post_id}`}>Go To Post</Link>
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
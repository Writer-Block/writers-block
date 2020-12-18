import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './Dash.css'

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
                <div key={index} >
                    <h2> Your Writing:
                        <p>{post.content}</p>
                    </h2>
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
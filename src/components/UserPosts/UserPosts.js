import './UserPosts.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import axios from 'axios';

// this component gets and displays all of the users posts based on 
// the userid on redux state. each displayed post is a link to 
// that single posts page. where you can see the comments and edit/delte the post
class UserPosts extends Component{
    constructor(){
        super();

        this.state = {
            myPosts: []
        }
    }

    //gets all the users posts on mount
    componentDidMount(){
        this.getUserPosts();
    }

    //gets all posts
    getUserPosts = async () => {
        //axios request to get posts for user id from redux
        const userPosts = await axios.get(`/api/myposts/${this.props.user_id}`);
        this.setState({
            myPosts: userPosts.data
        })
    }

    //maps over my posts from state and displays each one of them. each post is a link
    render(){
        const mappedPosts = this.state.myPosts.map((post, index) => {
            return(
                <Link key={index} to={`/post/${post.post_id}`}>
                    <p>{post.content}</p>
                </Link>
            )
        })

        return(
        <div className='UserPosts'>
            {!this.state.myPosts[0] ? 
                <h1>You don't have any posts</h1>
                :
                <div className="usersPost">
                    <h1>UserPosts</h1>
                    {mappedPosts}
                </div>
            }
            {console.log(this.props.user_id)}
        </div>
        )
    }
}

function mapStateToProps(state){
    return {user: state.user_id}
}

export default connect(mapStateToProps)(UserPosts);
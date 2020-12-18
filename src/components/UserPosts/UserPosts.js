import './UserPosts.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// this component gets and displays all of the users posts. each displayed post is a link to 
// that single posts page. 
class UserPosts extends Component{
    constructor(){
        super();

        this.state = {
            myPosts: [
                {post_id: 3, content: "Wassup doggieeees"},
                {post_id: 4, content: "Leedle leedle leedle"}
            ]
        }
    }

    //gets all posts
    getUserPosts = async () => {
        //axios request to get posts for user id from redux
    }

    //maps over my posts from state and displays each one of them. each post is a link
    render(){
        const mappedPosts = this.state.myPosts.map((post, index) => {
            return(
                <div>
                    <p>{post.content}</p>
                </div>
            )
        })

        return(
        <div className='UserPosts'>
            <h1>UserPosts</h1>
            {mappedPosts}
        </div>
        )
    }
}

export default UserPosts;
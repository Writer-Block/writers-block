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
                <div key={index}>
                    <Link key={index} to={`/post/${post.post_id}`} className="myPostLink">
                        <div className="userPost">
                            <p>{post.content}</p>
                        </div>
                    </Link>

                        <div className="userPostButtons">
                            <h1> </h1> 
                            <Link to={`/edit/${post.post_id}`}><button>Revise</button></Link>
                        </div>
                </div>
            )
        })

        return(
        <div className='userPosts'>
            {!this.state.myPosts[0] ? 
                <h1>You don't have any posts</h1>
                :
                <div className="usersPost">
                    <h1>Your Posts</h1>
                    {mappedPosts}
                </div>
            }
            {console.log(this.props.user_id)}
        </div>
        )
    }
}

function mapStateToProps(state){
    return {user_id: state.user_id}
}

export default connect(mapStateToProps)(UserPosts);
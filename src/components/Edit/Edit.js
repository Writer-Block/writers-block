import './Edit.css';
import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';

// this component gets the post with id off the url
// gets the comments to go with the post
//displays the post and the comments
// has delete, cancel, and add buttons as well as input boxes to edit the post.
class Edit extends Component{
    constructor(){
        super();

        this.state = {
            post: {},
            comments: []
        }
    }

    componentDidMount(){
        this.getPost();
        this.getComments();
    }

    //gets post
    getPost = async () => {
        //axios call to get post
        const post = await axios.get(`/dash/posts/${this.props.match.params.post_id}`)
        //set state post = to axios return
        this.setState({
            post: post.data[0]
        })
    }

    getComments = async () => {
        //axios call to get comments
        const comments = await axios.get(`/api/comments/${this.props.match.params.post_id}`)
        //set state comments to = axios return
        this.setState({
            comments: comments.data
        })
    }

    render(){
        const mappedComments = this.state.comments.map((comment, index) => {
            return(
                <div key={index} className="editComments">
                    <p>{comment.comment}</p>
                </div>
            )
        })
        return(
            <div className="Edit">
                <h1>Edit Post</h1>
                <div className="editContent">
                    <p>{this.state.post.content}</p>
                </div>
                <div className="editButtons">
                    <button>Delete</button>
                    <div>
                        <button>Cancel</button>
                        <button>Save</button>
                    </div>
                </div>

                <div>
                    {mappedComments}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {user_id: state.user_id}
}

export default connect(mapStateToProps)(Edit);
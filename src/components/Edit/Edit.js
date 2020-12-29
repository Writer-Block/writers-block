import './Edit.css';
import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import copyicon from '../../media/copyicon.png'

// this component gets the post with id off the url
// gets the comments to go with the post
//displays the post and the comments
// has delete, cancel, and add buttons as well as input boxes to edit the post.
class Edit extends Component{
    constructor(){
        super();

        this.state = {
            post: {},
            comments: [],
            input: ""
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
            post: post.data[0],
            input: post.data[0].content
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

    // copies text from comment to clipboard
    copyCodeToClipboard = () => {
          /* Get the text field */
            var copyText = document.getElementById("comment");

            /* Select the text field */
            copyText.select();

            /* Copy the text inside the text field */
            document.execCommand("copy");
      }

    //handles input change
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }        
        
        
    // handles cancel button click. sets the input back to the original 
    handleCancel = () => {
        this.setState({
            input: this.state.post.content
        })
    }

    render(){
        const mappedComments = this.state.comments.map((comment, index) => {
            
            return(
                <div key={comment.comment_id} className="editComments">
                    <input name="" className="comment" id={`comment ${comment.comment_id}`} value={comment.comment} readOnly></input>
                    <button className="copyButton" onClick={() => {
                        /* Get the text field */
                        var copyText = document.getElementById(`comment ${comment.comment_id}`);
                        /* Select the text field */
                        copyText.select();

                        /* Copy the text inside the text field */
                        document.execCommand("copy");
                    }}><img alt="copy" src={copyicon}/></button>
                </div>
            )
        })
        return(
            <div className="Edit">
                <h1>Edit Post</h1>
                <div>
                    <textarea onChange={ e => this.changeHandler(e)} name="input" type="text" className="editContent" value={this.state.input}></textarea>
                </div>
                <div className="editButtons">
                    <button>Delete</button>
                    <div>
                        <button onClick={this.handleCancel}>Cancel</button>
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
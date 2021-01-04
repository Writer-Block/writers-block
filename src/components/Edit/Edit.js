import './Edit.css';
import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import {Link} from 'react-router-dom'
import copyicon from '../../media/copyicon.png';
import trashicon from '../../media/trashicon.png';

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
            input: "",
            toggleDelete: false
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

    // handles save button. updates the content of the post.
    handleSave =  async () => {
        const updatedPost = await axios.put(`/api/mypost/${this.state.post.post_id}`, {content: this.state.input})
        this.setState({
            post: updatedPost.data[0]
        })
        this.props.history.push('/userposts')
    }

    // handles delete button. deletes the post and all comments that go with it
    //sends you back to my posts page
    handleDelete = async () => {
        await axios.delete(`/api/mypost/delete/${this.state.post.post_id}`);
        this.props.history.push('/userposts');
    }

    handleCommentDelete = async (comment_id) => {
        await axios.delete(`/api/comments/${comment_id}`)
        this.getComments();
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

                    <button className="copyButton" onClick={() => this.handleCommentDelete(comment.comment_id)}><img alt="trash" src={trashicon}/></button>
                </div>
            )
        })
        return(
            <div className="Edit">
                <Link  to="/userposts"><button className="backLink">{'<-Back'}</button></Link>
                <h1>Revise</h1>
                <div>
                    <textarea onChange={ e => this.changeHandler(e)} name="input" type="text" className="editContent" value={this.state.input}></textarea>
                </div>
                <div className="editButtons">
                    <button onClick={() => this.setState({toggleDelete: true})}>Delete</button>
                    <div>
                        <button onClick={this.handleCancel}>Undo</button>
                        <button onClick={this.handleSave}>Save</button>
                    </div>
                </div>
                <div className={this.state.toggleDelete ? "confirmBackground" : "hideConfirm"}></div>
                <div className={this.state.toggleDelete ? "confirmDelete" : "hideConfirm"}>
                    <h5>Are you sure you want to delete? This cannot be undone</h5>
                    <div className="confirmDeleteButtons">
                        <button onClick={() => this.setState({toggleDelete: false})}>Cancel</button>
                        <button onClick={this.handleDelete}>Delete</button>
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
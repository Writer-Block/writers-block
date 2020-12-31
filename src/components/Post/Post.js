import React, {Component} from 'react'
import {connect} from "react-redux"
import axios from "axios"
import Comment from "./Comment"
import "./Post.css"

class Post extends Component {
    constructor() {
        super()
        this.state = {
            content: "",
            comment: "",
            comments: [],
            add: false
        }
    }
    

    componentDidMount = () => {
        this.getUserPost()
        this.getComments()
    }

    //# function for getting the content of the post
    getUserPost = () => {
        axios.get(
            `/dash/posts/${this.props.match.params.post_id}`
        )
        .then (res => {
            this.setState({
                content: res.data[0].content
            })
            console.log(res.data[0])
        })
        .catch(err => console.log(err))
    }
    
    //# function for viewing all comments on a specific post
    getComments = async () => {
        try {
            const res = await axios.get(`/api/comments/${this.props.match.params.post_id}`)
            this.setState({
                comments: res.data
            })
          } catch (err) {
            console.log(err)
          }
      }    

    //# function for adding comments
    addComment = async (e) => {
        e.preventDefault()
        const {comment} = this.state
        try {
            await axios.post(`/api/comments/${this.props.match.params.post_id}`, {comment})
            this.setState({
                comment: ""
            })
            this.getComments()
        } catch (err) {
            console.log(err)
        }
    }

    //# Switches between button and form
    setAdd = () => {
        this.setState({
            add: !this.state.add
        })
        console.log(this.state)
    }

    handleComment = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const {setAdd} = this
        const {comment, content, add} = this.state
        let mappedComments = []
        mappedComments = this.state.comments.map((comment) => (
            <Comment className="commentcontainer"
                key = {comment.comment_id}
                comment = {comment}
            />
        ))
        return(
            <div className = "post">
                    <p className = "content">{content}</p>
                    {add
                        ?
                        <form className = "comment-form">
                            <input className = "comment-input"
                                name = "comment"
                                value = {comment}
                                placeholder = "Enter your comment"
                                onChange = {e => this.handleComment(e)}
                            />
                            <button className = "comment-button"
                                onClick = {(e) => {
                                    this.addComment(e)
                                    setAdd()
                                }}
                                > 
                                Submit 
                            </button>
                            <button className = "comment-button"
                                onClick = {() => {
                                    setAdd()
                                }}
                            >
                                Cancel
                            </button>
                        </form>
                        :
                        <button className = "comment-button"
                            onClick = {() => {
                                setAdd()
                            }}
                        >
                            Add Comment
                        </button>
                    }
                    {mappedComments}
            </div>
        )
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(Post)
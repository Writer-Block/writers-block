import React, {Component} from 'react'
import {connect} from "react-redux"
import axios from "axios"
import Comment from "./Comment"


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
            <Comment
                key = {comment.comment_id}
                comment = {comment}
            />
        ))
        return(
            <div>
              {add
                ?
                  <form>
                      <input
                          name = "comment"
                          value = {comment}
                          placeholder = "Enter your comment"
                          onChange = {e => this.handleComment(e)}
                      />
                      <button 
                          onClick = {(e) => {
                              this.addComment(e)
                              setAdd()
                          }}
                          > 
                          Submit 
                      </button>
                      <button
                          onClick = {() => {
                              setAdd()
                          }}
                      >
                          Cancel
                      </button>
                  </form>
                :
                  <button
                      onClick = {() => {
                          setAdd()
                      }}
                  >
                      Add Comment
                  </button>
                }
                <p>{content}</p>
              <ul
                  style = {{listStyle: "none"}} 
                  >
                  {mappedComments}
              </ul>
            </div>
        )
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(Post)
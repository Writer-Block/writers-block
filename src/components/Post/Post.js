import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import axios from "axios"
import Comment from "./Comment"

const [comments, setComments] = useState([])
const [comment, setComment] = useState("")
const [add, setAdd] = useState(false)

const Post = () => {
    useEffect(() => {
        getComments()
    }, [])
    
    const getComments = async () => {
        try {
            const res = await axios.get(`/api/comments/${post_id}`)
            setComments(res.data)
          } catch (err) {
            console.log(err)
          }
      }    

    const addComment = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`/api/comments/${post_id}`, {comment})
            setComment("")
            getBooks()
        } catch (err) {
            console.log(err)
        }
    }

    const mappedComments = comments.map((comment) => {
        return (
            <Comment
                key = {`${comment.comment_id}`} 
                comment = {comment}
                getComments = {getComments}
            />
        )
    })

      return(
          <div>
              {add
              ?
                <form>
                    <input
                        name = "comment"
                        value = {comment}
                        placeholder = "Enter your comment"
                        onChange = {e => setComment(e.target.value)}
                    />
                    <button 
                        onClick = {(e) => {
                            addComment(e)
                            setAdd(!add)
                        }}
                        > 
                        Submit 
                    </button>
                    <button
                        onClick = {() => {
                            setAdd(!add)
                        }}
                    >
                        Cancel
                    </button>
                </form>
              :
                <button
                    onClick = {() => {
                        setAdd(!add)
                    }}
                >
                    Add Comment
                </button>
              }
            <ul
                style = {{listStyle: "none"}} 
                >
                {mappedComments}
            </ul>
          </div>
      )
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(Post)
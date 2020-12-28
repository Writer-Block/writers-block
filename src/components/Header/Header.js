import React, {useEffect, useState} from 'react'
import {Link, useHistory} from "react-router-dom"
import {connect, useDispatch} from "react-redux"
import {logoutUser} from "../../redux/reducer"
import axios from "axios"
import "./Header.css"

const Header = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [pic, setPic] = useState("")

    const logout = async () => {
        try {
            await axios.post('/auth/logout')
                dispatch(logoutUser())
                history.push('/')
        } catch (err){
            console.log(err)
        }
    }

    useEffect(() =>{
        const getPic = async () => {
            try {
                const res = await axios.get(`/api/pic/${props.user_id}`)
                setPic(res.data)
              } catch (err) {
                console.log(err)
              }
          }
          getPic()
    }, [props.user_id])

        return (
            <div>
                {props.user_id
                ?
                <div className = "header">
                    <Link to = "/createpost"
                        className = "link"
                        id = "createpost"
                    >
                        Add Post
                    </Link>
                    <Link to = "/userposts"
                        className = "link"
                        id = "userposts"
                    >
                        Your Posts
                    </Link>
                    <Link to = "/dash"
                        className = "link"
                        id = "dash"
                    >
                        All Posts
                    </Link>
                    <Link to = "/"
                        className = "link"
                        id = "logout"
                        onClick = {logout}
                    >
                        Logout
                    </Link>
                    <img className = "profile-pic" alt = "profile-pic" src = {`${pic}`}/>
                </div>
                :
                    null
                }
            </div>
        )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {logoutUser})(Header)

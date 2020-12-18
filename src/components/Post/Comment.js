import React from 'react'


const Comment = (props) => {
    const {comment} = props.comment

    return(
        <div>
            <h4>{comment}</h4>
        </div>
    )
}

export default Comment
import './Edit.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import axios from 'axios';

// this component 
class Edit extends Component{
    render(){
        return(
            <div>
                <h1>Edit Post</h1>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {user_id: state.user_id}
}

export default connect(mapStateToProps)(Edit);
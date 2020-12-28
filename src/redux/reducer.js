const initialState = {
    
    user_id: ''
}
//Action Types
const GET_USER = "GET_USER" //Using in the Register page
const LOGOUT_USER = "LOGOUT_USER"

export const getUser = (user_id) => {
    return {
        type: GET_USER,
        payload: user_id
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER, 
        payload: initialState
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                user_id: action.payload
            }
        case LOGOUT_USER: 
            return action.payload
        default:
            return state
    }
}
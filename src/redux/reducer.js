const initialState = {
    
    user_id: ''
}
//Action Types
const GET_USER = "GET_USER" //Using in the Register page

export const getUser = (user_id) => {
    return {
        type: GET_USER,
        payload: user_id
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                user_id: action.payload
            }
            default:
                return state
    }
}
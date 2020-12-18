const initialState = {
    user: {}
}
//Action Types
const GET_USER = "GET_USER" //Using in the Register page

export const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
            default:
                return state
    }
}
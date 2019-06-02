import * as types from './../constants/ActionTypes'

// var initState = {};
export const initState = {};

const answer = (state = initState, action) =>{
    switch(action.type){
        case types.ANSWER:
            return state = {
                body: action.data,
                success: false,
                error: false,
                loading: true,
            }
        case types.ANSWER_SUCCESS:
            return state = {
                success: true,
                error: false,
                loading: false,
            }
        case types.ANSWER_FAILED:
            return state = {
                success: false,
                error: true,
                loading: false,
            }
        default:
            return state;
    }
}


export default answer;
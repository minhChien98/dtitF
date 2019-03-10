import * as types from './../constants/ActionTypes'

// var initState = {};
export const initState = {};

const questions = (state = initState, action) =>{
    switch(action.type){
        case types.GET_QUESTION_IN_ROUND:
            return state = {
                body: action.data,
                success: false,
                error: false,
                loading: true,
            }
        case types.GET_QUESTION_IN_ROUND_SUCCESS:
            return state = {
                questions: action.questions,
                success: true,
                error: false,
                loading: false,
            }
        case types.GET_QUESTION_IN_ROUND_FAILED:
            return state = {
                success: false,
                error: true,
                loading: false,
            }
        default:
            return state;
    }
}


export default questions;
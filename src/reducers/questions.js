import * as types from './../constants/ActionTypes'

// var initState = {};
export const initState = {};

const questions = (state = initState, action) =>{
    switch(action.type){
        case types.GET_QUESTION_IN_LIST:
            return state = {
                body: action.data,
                success: false,
                error: false,
                loading: true,
            }
        case types.GET_QUESTION_IN_LIST_SUCCESS:
            return state = {
                questions: action.questions,
                success: true,
                error: false,
                loading: false,
            }
        case types.GET_QUESTION_IN_LIST_FAILED:
            return state = {
                success: false,
                error: true,
                loading: false,
        }
        case types.RESET_NOTI:
          return state = {
              success: false,
              error: false,
              loading: false,
          }
        default:
            return state;
    }
}


export default questions;
import * as types from './../constants/ActionTypes'

// var initState = {};
export const initState = {};

const questionList = (state = initState, action) =>{
    switch(action.type){
        case types.GET_QUESTIONLIST:
            return state = {
                body: action.data,
                success: false,
                error: false,
                loading: true,
            }
        case types.GET_QUESTIONLIST_SUCCESS:
            return state = {
                questionList: action.questionList,
                success: true,
                error: false,
                loading: false,
            }
        case types.GET_QUESTIONLIST_FAILED:
            return state = {
                success: false,
                error: true,
                loading: false,
            }
        default:
            return state;
    }
}


export default questionList;
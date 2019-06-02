import * as types from './../constants/ActionTypes'

// var initState = {};
export const initState = {};

const questionList = (state = initState, action) => {
  switch (action.type) {
    case types.RESET_NOTI:
      return state = {
        success: false,
        error: false,
        loading: false,
      }
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
    case types.CHECK:
      return state = {
        body: action.data,
        success: false,
        error: false,
        loading: true,
      }
    case types.CHECK_SUCCESS:
      return state = {
        success: true,
        error: false,
        loading: false,
      }
    case types.CHECK_FAILED:
      return state = {
        success: false,
        error: true,
        loading: false,
      }
    case types.PLAYED:
      return state = {
        body: action.data,
        success: false,
        error: false,
        loading: true,
      }
    case types.PLAYED_SUCCESS:
      return state = {
        success: true,
        error: false,
        loading: false,
      }
    case types.PLAYED_FAILED:
      return state = {
        success: false,
        error: true,
        loading: false,
      }
    case types.AVAIABLE:
      return state = {
        body: action.data,
        success: false,
        error: false,
        loading: true,
      }
    case types.AVAIABLE_SUCCESS:
      return state = {
        success: true,
        error: false,
        loading: false,
      }
    case types.AVAIABLE_FAILED:
      return state = {
        success: false,
        error: true,
        loading: false,
      }
    case types.PLAYGROUNDS:
      return state = {
        body: action.data,
        success: false,
        error: false,
        loading: true,
      }
    case types.PLAYGROUNDS_SUCCESS:
      return state = {
        success: true,
        error: false,
        loading: false,
      }
    case types.PLAYFROUNDS_FAILED:
      return state = {
        success: false,
        error: true,
        loading: false,
      }
    case types.PLAY:
      return state = {
        body: action.data,
        success: false,
        error: false,
        loading: true,
      }
    case types.PLAY_SUCCESS:
      return state = {
        success: true,
        error: false,
        loading: false,
      }
    case types.PLAY_FAILED:
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
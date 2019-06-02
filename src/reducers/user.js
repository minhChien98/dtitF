import * as types from './../constants/ActionTypes'

// var initState = {};
export const initState = {};

const user = (state = initState, action) =>{
    switch(action.type){
        case types.REGISTER:
            return state = {
                body: action.data,
                success: false,
                error: false,
                loading: true,
            }
        case types.REGISTER_SUCCESS:
            return state = {
                success: true,
                error: false,
                loading: false,
            }
        case types.REGISTER_FAILED:
            return state = {
                success: false,
                error: true,
                loading: false,
            }
        case types.LOGIN:
            return state = {
                body: action.data,
                success: false,
                error: false,
                loading: true,
            }
        case types.LOGIN_SUCCESS:
            return state = {
                token: action.token,
                name: action.name,
                role: action.role,
                success: true,
                error: false,
                loading: false,
            }
        case types.LOGIN_FAILED:
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


export default user;
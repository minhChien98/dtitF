import * as types from './../constants/ActionTypes'
import { fromJS } from 'immutable';

// var initState = {};
export const initState = fromJS({});

const user = (state = initState, action) =>{
    switch(action.type){
        case types.REGISTER:
            return state
                .set('body', action.data)
                .set('error', false)
                .set('loading', true);
        case types.REGISTER_SUCCESS:
            return state
                .set('succes', true)
                .set('error', false)
                .set('loading', true);
        case types.REGISTER_FAILED:
            return state
                .set('succes', false)
                .set('error', false)
                .set('loading', true);
        default:
            return state;
    }
}


export default user;
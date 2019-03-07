import * as types from './../constants/ActionTypes';
import request from './../request';
import { call, put, takeEvery } from 'redux-saga/effects';
import { BASE_API, REGISTER } from './../config';
import { RESPONSECODE } from './../requestCode';

// function here
export function* onRegister(action) {
    const REGISTER_URL = `${BASE_API}/${REGISTER}`;
    console.log('xxx')
    try {
        const res = yield call(request, REGISTER_URL, {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded',
            // },
            body: JSON.stringify(action.user)
          });
        if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {  
            const id = res.data;
            yield put({ type: types.REGISTER_SUCCESS, id });
        }
    } catch (error) {
        yield put({ type: types.REGISTER_FAILED, error });
    }
}

// call saga here
export function* mySaga() {
    yield takeEvery(types.REGISTER, onRegister)
}

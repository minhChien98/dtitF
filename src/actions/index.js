import * as types from './../constants/ActionTypes';
import request from './../request';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { BASE_API, REGISTER, LOGIN, QUESTIONS } from './../config';
import { RESPONSECODE } from './../requestCode';

// function here
export function* onRegister(action) {
    const REGISTER_URL = `${BASE_API}/${REGISTER}`;
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
        } else {
            yield put({ type: types.REGISTER_FAILED});
        }
    } catch (error) {
        yield put({ type: types.REGISTER_FAILED, error });
    }
}

export function* onLogin(action) {
    const REGISTER_URL = `${BASE_API}/${LOGIN}`;
    try {
        const res = yield call(request, REGISTER_URL, {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded',
            // },
            body: JSON.stringify(action.user)
          });
        if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {  
            localStorage.setItem('token', res.token);
            localStorage.setItem('name', res.user.name);
            yield put({ type: types.LOGIN_SUCCESS, token: res.token, name: res.user.name });
        } else {
            yield put({ type: types.LOGIN_FAILED});
        }
    } catch (error) {
        yield put({ type: types.LOGIN_FAILED, error });
    }
}

export function* onGetQuestionList() {
    const REGISTER_URL = `${BASE_API}/${QUESTIONS}`;
    const token = localStorage.getItem('token');
    try {
        const res = yield call(request, REGISTER_URL, {
            method: 'GET',
            headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': token
            },
          });
        if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {
            const questionslist = res.questionslist;
            localStorage.setItem('listQuestion', JSON.stringify(questionslist));
            yield put({ type: types.GET_QUESTIONLIST_SUCCESS, questionList: questionslist });
        } else {
            yield put({ type: types.GET_QUESTIONLIST_FAILED});
        }
    } catch (error) {
        yield put({ type: types.GET_QUESTIONLIST_FAILED, error });
    }
}

export function* onGetQuestionInList(action) {
    const REGISTER_URL = `${BASE_API}/${QUESTIONS}/${action.listId}`;
    const token = localStorage.getItem('token');
    try {
        const res = yield call(request, REGISTER_URL, {
            method: 'GET',
            headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': token
            },
          });
        if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {
            const questions = res.questionslist.questions;
            yield put({ type: types.GET_QUESTION_IN_ROUND_SUCCESS, questions: questions });
        } else {
            yield put({ type: types.GET_QUESTION_IN_ROUND_FAILED});
        }
    } catch (error) {
        yield put({ type: types.GET_QUESTION_IN_ROUND_FAILED, error });
    }
}

// call saga here
export function* mySaga() {
    yield takeEvery(types.REGISTER, onRegister);
    yield takeEvery(types.LOGIN, onLogin);
    yield takeLatest(types.GET_QUESTIONLIST, onGetQuestionList);
    yield takeEvery(types.GET_QUESTION_IN_ROUND, onGetQuestionInList);
}

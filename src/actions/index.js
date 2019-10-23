import * as types from "./../constants/ActionTypes";
import request from "./../request";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  BASE_API,
  REGISTER,
  LOGIN,
  ANSWER,
  CHECK,
  // PLAYED,
  ROUNDS_AVAIABLE,
  PLAYGROUND,
  PLAY,
  QUESTIONS
} from "./../config";
import qs from "qs";
import { RESPONSECODE } from "./../requestCode";

// function here
export function* onRegister(action) {
  const REGISTER_URL = `${BASE_API}/${REGISTER}`;
  try {
    const res = yield call(request, REGISTER_URL, {
      method: "POST",
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // },
      body: JSON.stringify(action.user)
    });
    if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {
      const id = res.data;
      yield put({ type: types.REGISTER_SUCCESS, id });
    } else {
      yield put({ type: types.REGISTER_FAILED });
    }
  } catch (error) {
    yield put({ type: types.REGISTER_FAILED, error });
  }
}

export function* onLogin(action) {
  const LOGIN_URL = `${BASE_API}/${LOGIN}`;
  try {
    const res = yield call(request, LOGIN_URL, {
      method: "POST",
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // },
      body: JSON.stringify(action.user)
    });
    if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {
      localStorage.setItem("userId", res.user.id);
      localStorage.setItem("token", res.token);
      localStorage.setItem("name", res.user.name);
      localStorage.setItem("studentId", res.user.studentId);
      yield put({
        type: types.LOGIN_SUCCESS,
        token: res.token,
        name: res.user.name,
        role: res.user.role
      });
    } else {
      yield put({ type: types.LOGIN_FAILED });
    }
  } catch (error) {
    yield put({ type: types.LOGIN_FAILED, error });
  }
}

export function* onAnswer(action) {
  const ANSWER_URL = `${BASE_API}/${ANSWER}`;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const answer = {
    result: action.answer
  };
  try {
    const res = yield call(request, `${ANSWER_URL}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": token
      },
      body: qs.stringify(answer)
    });
    if (res) {
      yield put({ type: types.ANSWER_SUCCESS, data: res });
    } else {
      yield put({ type: types.ANSWER_FAILED });
    }
  } catch (error) {
    yield put({ type: types.ANSWER_FAILED, error });
  }
}

export function* getQuestionListSaga(action) {
  const QUESTIONS_LIST = `${BASE_API}/${QUESTIONS}`;
  const token = localStorage.getItem("token");
  try {
    const res = yield call(request, QUESTIONS_LIST, {
      method: "GET",
      headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        "x-access-token": token
      }
    });
    if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {
      yield put({
        type: types.GET_QUESTIONLIST_SUCCESS,
        questionList: res.questionslist
      });
    } else {
      yield put({ type: types.GET_QUESTIONLIST_FAILED });
    }
  } catch (error) {
    yield put({ type: types.GET_QUESTIONLIST_FAILED, error });
  }
}

export function* getQuestionInListSaga(action) {
  const QUESTIONS_LIST = `${BASE_API}/${QUESTIONS}/${action.listId}`;
  const token = localStorage.getItem("token");
  try {
    const res = yield call(request, QUESTIONS_LIST, {
      method: "GET",
      headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        "x-access-token": token
      }
    });
    if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {
      yield put({
        type: types.GET_QUESTION_IN_LIST_SUCCESS,
        questions: res.questionslist.questions
      });
    } else {
      yield put({ type: types.GET_QUESTION_IN_LIST_FAILED });
    }
  } catch (error) {
    yield put({ type: types.GET_QUESTION_IN_LIST_FAILED, error });
  }
}

export function* onCheck() {
  const CHECK_URL = `${BASE_API}/${CHECK}`;
  const token = localStorage.getItem("token");
  const studentId = localStorage.getItem("studentId");
  try {
    const res = yield call(request, CHECK_URL, {
      method: "POST",
      headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        "x-access-token": token
      },
      body: JSON.stringify({ studentId: studentId })
    });
    if (res) {
      yield put({ type: types.CHECK_SUCCESS, data: res.code });
    } else {
      yield put({ type: types.CHECK_FAILED });
    }
  } catch (error) {
    yield put({ type: types.CHECK_FAILED, error });
  }
}

export function* onPlayed() {
  const token = localStorage.getItem("token");
  const AVAIABLE_URL = `${BASE_API}/${ROUNDS_AVAIABLE}`;
  try {
    const res = yield call(request, AVAIABLE_URL, {
      method: "GET",
      headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        "x-access-token": token
      }
    });
    if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {
      const roundid = res.round[0]._id;
      const PLAYGROUNDS_URL = `${BASE_API}/${PLAYGROUND}`;
      try {
        const res = yield call(request, PLAYGROUNDS_URL, {
          method: "POST",
          headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded',
            "x-access-token": token
          },
          body: JSON.stringify({ roundid })
        });
        if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {
          const pid = res.id;
          const PLAY_URL = `${BASE_API}/${PLAY}`;
          try {
            const res = yield call(request, PLAY_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": token
              },
              body: JSON.stringify({ pid })
            });
            if (res.code === RESPONSECODE.CODE_OK_WITH_MESS) {
              yield put({ type: types.PLAY_SUCCESS });
            } else {
              yield put({ type: types.PLAYFROUNDS_FAILED });
            }
          } catch (error) {
            yield put({ type: types.PLAYFROUNDS_FAILED, error });
          }
        } else {
          yield put({ type: types.PLAYFROUNDS_FAILED });
        }
      } catch (error) {
        yield put({ type: types.PLAYFROUNDS_FAILED, error });
      }
    } else {
      yield put({ type: types.AVAIABLE_FAILED });
    }
  } catch (error) {
    yield put({ type: types.AVAIABLE_FAILED, error });
  }
}

// call saga here
export function* mySaga() {
  yield takeEvery(types.REGISTER, onRegister);
  yield takeEvery(types.LOGIN, onLogin);
  yield takeEvery(types.CHECK, onCheck);
  yield takeEvery(types.ANSWER, onAnswer);
  yield takeEvery(types.PLAYED, onPlayed);
  yield takeEvery(types.GET_QUESTIONLIST, getQuestionListSaga);
  yield takeEvery(types.GET_QUESTION_IN_LIST, getQuestionInListSaga);
}

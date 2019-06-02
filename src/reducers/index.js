import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';
import questionList from './questionList';
import answer from './answer';

const appReducers = combineReducers({
    user,
    questions,
    questionList,
    answer,
});

export default appReducers;
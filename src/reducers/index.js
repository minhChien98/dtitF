import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';
import questionList from './questionList';

const appReducers = combineReducers({
    user,
    questions,
    questionList,
});

export default appReducers;
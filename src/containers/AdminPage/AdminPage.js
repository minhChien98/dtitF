import React, { Component } from 'react';
import './../../styles/play.css';
// import Modal from './../../components/modal';
import * as types from './../../constants/ActionTypes';
import { connect } from 'react-redux';
import './../../styles/admin.css';

// const socket = socketIOClient(SOCKET_BASE);
class AdminPage extends Component {

  state = {
    questionList: [],
    currentQuestion: -1,
    questions: [],
    currentList: 0,
    start: false,
    next: true,
    ans: true,
    indexQues: 0,
    canStartHelp: true,
  }

  componentWillMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    } else {
      this.props.onGetQuestionList();
      // this.props.onPlay();
    }
  }

  componentWillReceiveProps(props) {
    const { questionList, questions } = props;
    if (questionList && questionList.success) {
      this.setState({ questionList: questionList.questionList })
      this.props.onGetQuestionInList(questionList.questionList[this.state.currentList]._id);
      this.props.onReserNoti();
    }
    if (questions && questions.success) {
      this.setState({ questions: questions.questions });
      this.props.onReserNoti();
    }
  }

  render() {
    const { currentQuestion, questions } = this.state;
    const name = localStorage.getItem('name');
    return (
      <div className="col-md-6 col-sm-11 container">
        {/* <div className="card cardCustom card-body"> */}
        <div className="col-md-12 col-sm-12 container card cardCustom">
          <div className="col-md-5 col-sm-5">
            Xin chào {name}.
                </div>
          <div className="col-md-5 col-sm-5">
            <button className="btn btn-danger" onClick={this.logOut}>Đăng xuất</button>
          </div>
        </div>

        {/* </div> */}
        {this.state.currentQuestion >= 0 ? (
          <React.Fragment>
            <div className="card cardCustom">
              Câu hiện tại: {questions[currentQuestion].questId.content}
            </div>
            {currentQuestion + 1 < questions.length ? (
              <div className="card cardCustom">
                Câu tiếp theo: {questions[currentQuestion + 1].questId.content}
              </div>
            ) : ('')}

          </React.Fragment>
        ) : ('')}

        <button disabled={this.state.start} className="btn btn-primary" style={{ width: '100%' }} onClick={this.startGame}>Bắt đầu</button>
        <button disabled={this.state.next} className="btn btn-primary" style={{ width: '100%' }} onClick={this.nextQuestion}>Câu kế tiếp</button>
        <button disabled={this.state.ans} className="btn btn-primary" style={{ width: '100%' }} onClick={this.raiseAns}>Trả kết quả</button>
        <button className="btn btn-primary" style={{ width: '100%' }}   onClick={this.changeQuestionList}>Thay bộ câu hỏi</button>
        <button disabled={this.state.canStartHelp} className="btn btn-primary" style={{ width: '100%' }}  onClick={this.startHelp}>Bắt đầu cứu trợ</button>
        {/* <button disabled={this.state.canStartHelp} className="btn btn-primary" style={{ width: '100%' }}  onClick={this.stopTime}>Dừng thời gian cứu trợ</button> */}
        <button disabled={this.state.canStartHelp} className="btn btn-primary" style={{ width: '100%' }}  onClick={this.continueTime}>Tiếp tục thời gian</button>
        <button disabled={this.state.canStartHelp} className="btn btn-primary" style={{ width: '100%' }}  onClick={this.showHelp}>Hiển thị kết quả cứu trợ</button>
      </div>
    );
  }

  startGame = () => {
    window.socketIO.emit('admin', { message: this.state.questions[0].questId._id, command: 1000 });
    this.setState({ currentQuestion: 0, start: true, ans: false });
  }

  raiseAns = () => {
    window.socketIO.emit('admin', { command: 4000 });
    this.setState({ next: false, ans: true });
  }

  changeQuestionList = () => {
    window.socketIO.emit('admin', { command: 4500 });
    const { currentList, questionList } = this.state;
    this.props.onGetQuestionInList(questionList[currentList + 1]._id);
    this.setState({ currentList: currentList + 1, indexQues: -1, canStartHelp: false });
  }

  showHelp = () => {
    window.socketIO.emit('admin', { command: 3002 });
  }

  startHelp = () => {
    const { indexQues } = this.state;
    window.socketIO.emit('admin', { message: this.state.questions[indexQues].questId._id, command: 3001 });
    window.socketIO.emit('admin', { command: 5000 });
  }

  continueTime = () => {
    window.socketIO.emit('admin', { command: 5001 });
  }

  nextQuestion = () => {
    const { indexQues } = this.state;
    this.setState({ indexQues: indexQues + 1, next: true, ans: false });
    window.socketIO.emit('admin', { message: this.state.questions[indexQues + 1].questId._id, command: 1000 });
  }

  logOut = () => {
    localStorage.removeItem('studentId');
    window.socketIO.emit('disconnect');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    this.props.history.push('/login');
  }
}

const mapStateToProps = state => {
  return {
    questionList: state.questionList,
    questions: state.questions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetQuestionList: () => dispatch({ type: types.GET_QUESTIONLIST }),
    onGetQuestionInList: listId => dispatch({ type: types.GET_QUESTION_IN_LIST, listId }),
    onAnswer: answer => dispatch({ type: types.ANSWER, answer }),
    onReserNoti: () => dispatch({ type: types.RESET_NOTI }),
    // onPlay: () => dispatch({ type: types.PLAYED }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);

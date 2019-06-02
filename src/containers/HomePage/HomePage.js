import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard } from 'mdbreact';
import { connect } from 'react-redux';
import * as types from './../../constants/ActionTypes';


import Modal from './../../components/modal';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      options: [],
      data: null,
      id: '',
      currentQuestion: 0,
      isShowing: false,
      answer: '',
      time: 20,
      start: false,
      timeInterval: null,
      correctAnswer: '',
      status: true,
      disableAns: false,
      receiveAnsToClient: false,
    }
  }


  componentWillMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    } else {
      this.props.onCheck();
    }
  }

  componentWillReceiveProps(props) {
    if (props !== this.props) {
      const { questionList, history } = props;
      if (questionList.error) {
        localStorage.removeItem('studentId');
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        history.push('/view');
      }
    }

  }

  componentDidMount() {
    const { id } = this.state;
    window.socketIO.on('changeQuestionList', () => {
      this.setState({ status: true, data: null });
      // console.log(data)
    });
    window.socketIO.on('stopTime', () => {
      clearInterval(this.state.timeInterval);
      // console.log(data)
    });
    window.socketIO.on('continueTime', () => {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.timeInterval = setInterval(() => {
        const { time } = this.state;
        this.setState({ time: time - 1 });
      }, 1000);
      // console.log(data)
    });
    window.socketIO.on('receiveAnswer', data => {
      if (data.die === 2) {
        this.props.history.push('/view');
      }
      this.setState({ status: data.result, receiveAnsToClient: true });
      // console.log(data)
    });
    window.socketIO.on('receiveQuestion', res => {
      if (id !== res.message._id) {
        clearInterval(this.state.timeInterval);
        this.setState({ data: res, content: res.message.content, currentQuestion: res.currentQues, correctAnswer: res.message.correctAnswer, options: res.message.options, id: res.message._id, start: true, time: 20, disableAns: false, receiveAnsToClient: false });
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.timeInterval = setInterval(() => {
          const { time } = this.state;
          this.setState({ time: time - 1 });
        }, 1000);
      }
    });


  }

  // startTime = () => {
  //   const { currentQuestion, start } = this.state;
  //   let x = 0;
  //   if (start && x === 0) {
  //     this.setState({ currentQuestion: currentQuestion + 1 });
  //     const timePlay = setInterval(() => {
  //       const { time } = this.state;
  //       console.log(timePlay)
  //       if (time === 1) {
  //         clearInterval(timePlay);
  //         this.setState({ time: 20 });
  //       }
  //       this.setState({ time: time - 1 });
  //     }, 1000);
  //     this.setState({ start: false });
  //     x++;
  //   }

  // };

  render() {
    const name = localStorage.getItem('name');
    const { time, disableAns } = this.state;
    if (disableAns === false && time === 0) {
      clearInterval(this.state.timeInterval);
      this.props.onAnswer(false, '');
      this.setState({ time: -1, status: false });
    }
    if (this.state.data === null && this.state.status === true) {
      return (
        <MDBContainer>
          <MDBRow style={{ height: '100px' }} />
          <MDBRow>
            <MDBCol md="2" />
            <MDBCol md="8">
              <MDBCard style={{ padding: '10px' }}>
                Chào mừng bạn {name} đã đến với cuộc thi Đấu trường IT năm 2019
                        </MDBCard>
              {/* <button type="button" className="btn btn-primary" onClick={() => this.toRedirect('contestOne')}>Bắt đầu</button> */}
              <button type="button" className="btn btn-secondary" onClick={this.logout}>Đăng xuất</button>
            </MDBCol>
            <MDBCol md="2" />
          </MDBRow>
        </MDBContainer>
      );
    } else if (this.state.data !== null && this.state.status === true && this.state.disableAns === false) {
      return (
        <div>
          <div className="card cardFixed">
            <div className="card-body">
              Chào mừng <b>{name}</b> đã đến với cuộc thi <b>Đấu trường IT</b>!
                </div>
          </div>

          <div className="col-md-8 col-sm-11 container">
            <div className="time col-md-2 col-sm-4">
              <img
                src="./images/time-png-png-512px-ico-icns-512.png" alt="time" className="timeImg" />
              <span style={{ verticalAlign: "middle" }} className="timeLive"><b>&nbsp;{this.state.time}s</b></span>
            </div>
            <div className="card bg-primary">
              <div className="card-body question">
                {/* <b>Câu {currentQuestion + 1}:</b> {this.state.content} */}
                <b>Câu {this.state.currentQuestion}:</b> {this.state.content}
              </div>
            </div>

            <div style={{ position: 'relative' }} className="answerContent">
              {this.state.options ? this.state.options.map((option, index) => {
                return (
                  <div className="answer" key={index} data-toggle="modal" disabled onClick={() => this.openModalHandler(option.numbering)}>{option.numbering.toUpperCase()}: {option.answer}. </div>
                );
              }) : ''}

              <Modal
                className="modal"
                answer={this.state.answer}
                correctAnswer={this.state.correctAnswer}
                options={this.state.options}
                id={this.state.id}
                show={this.state.isShowing}
                close={this.closeModalHandler}
                onAnswer={this.props.onAnswer}
                handleDisableAnswer={this.handleDisableAnswer}
                style={this.state.isShowing ? { display: 'block' } : { display: 'none' }}
              />
            </div>

          </div>
        </div>
      );
    } else if (this.state.disableAns && this.state.status) {
      if (this.state.receiveAnsToClient) {
        return (
          <MDBContainer>
            <MDBRow style={{ height: '100px' }} />
            <MDBRow>
              <MDBCol md="2" />
              <MDBCol md="8">
                <MDBCard style={{ padding: '10px' }}>
                  Chúc mừng bạn đã trả lời đúng câu hỏi vừa qua. <br />
                  Cùng chờ câu hỏi tiếp theo nha!
                        </MDBCard>
              </MDBCol>
              <MDBCol md="2" />
            </MDBRow>
          </MDBContainer>
        );
      }
      return (
        <MDBContainer>
          <MDBRow style={{ height: '100px' }} />
          <MDBRow>
            <MDBCol md="2" />
            <MDBCol md="8">
              <MDBCard style={{ padding: '10px' }}>
                Bạn đã trả lời câu hỏi, Bạn hãy chờ kết quả từ cuộc thi!
                        </MDBCard>
            </MDBCol>
            <MDBCol md="2" />
          </MDBRow>
        </MDBContainer>
      );
    } else if (this.state.status === false) {
      return (
        <MDBContainer>
          <MDBRow style={{ height: '100px' }} />
          <MDBRow>
            <MDBCol md="2" />
            <MDBCol md="8">
              <MDBCard style={{ padding: '10px' }}>
                Chào mừng bạn {name} đã đến với cuộc thi Đấu trường IT năm 2019 <br />
                Bạn đã bị loại!
                        </MDBCard>
              {/* <button type="button" className="btn btn-primary" onClick={() => this.toRedirect('contestOne')}>Bắt đầu</button> */}
              <button type="button" className="btn btn-secondary" onClick={this.logout}>Đăng xuất</button>
            </MDBCol>
            <MDBCol md="2" />
          </MDBRow>
        </MDBContainer>
      );
    }
  }

  openModalHandler = answer => {
    if (this.state.disableAns === false) {
      this.setState({
        isShowing: true,
        answer,
      });
    }
  }

  handleDisableAnswer = () => {
    this.setState({ disableAns: true });
    clearInterval(this.state.timeInterval);
  }

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  }



  toRedirect = slug => {
    this.props.history.push(`/${slug}`);
  }

  logout = () => {
    // window.socketIO.emit('disconnect');
    window.socketIO.disconnect();
    // window.socketIO.
    localStorage.removeItem('studentId');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.props.history.push('/login');
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    questionList: state.questionList,
    answer: state.answer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheck:()=> dispatch({type:types.CHECK}),
    onPlayed: () => dispatch({ type: types.PLAYED }),
    onAnswer: (answer, id) => dispatch({ type: types.ANSWER, answer, id })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);       
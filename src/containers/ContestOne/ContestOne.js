import React, { Component } from 'react';
import './../../styles/play.css';
import Modal from './../../components/modal';
import * as types from './../../constants/ActionTypes';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { SOCKET_BASE } from './../../config';


// const socket = socketIOClient(SOCKET_BASE);
class ContestOne extends Component {
    state = {
        isShowing: false,
        currentQuestion: -1,
        content: '',
        answerOptions: [],
        answer: '',
        time: 15,
        session: 0,
        stop: false,
        timePlay: '',
    }

    componentWillMount() {
        const { history } = this.props;
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login');
        }
        // else {
        //     const questionList = JSON.parse(localStorage.getItem('listQuestion'));
        //     this.props.onGetQuestionInRound(questionList[0]._id);
        // }
    }

    getSocketData = data => {
        this.setState({content: data[1].question.content, answerQuestion: data[1].question.options})
    }

    componentDidMount() {
        const socket = socketIOClient(SOCKET_BASE);
        setInterval(()=>{
            socket.on('question', data => console.log(data));
        },500);
        // this.onChangeQuestion();
    }

    render() {
        const name = localStorage.getItem('name');
        // const { currentQuestion } = this.state;
        // console.log(this.state)
        
            

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
                            <span style={{verticalAlign: "middle"}} className="timeLive"><b>{this.state.time}s</b></span>
                        </div>
                        <div className="card bg-primary">
                    <div className="card-body question">
                        {/* <b>Câu {currentQuestion + 1}:</b> {this.state.content} */}
                        <b>Câu 1:</b> Đây là nội dung của câu hỏi đầu tiên
                    </div>
                    </div>
                    
                        <div style={{position: 'relative'}} className="answerContent">
                            {/* {this.state.options ? this.state.options.map((option, index) => {
                                return (
                                    <div className="answer card" key={index} data-toggle="modal" onClick={() => this.openModalHandler(option.answer)}>{option.numbering.toUpperCase()}: {option.answer}. </div>
                                );
                            }) : ''} */}
                            
                                
                            {/* <p className="answer" data-toggle="modal" data-target="#myModal" onClick={this.openModalHandler}><b>B:</b> Quyết định thành lập Mặt trận Việt Minh để đoàn kết, tập hợp lực lượng cách mạng nhằm mục tiêu giải phóng dân tộc.</p>
                            
                            <p className="answer" data-toggle="modal" data-target="#myModal" onClick={this.openModalHandler}><b>C:</b> Đưa nhiệm vụ giải phóng dân tộc lên hàng đầu.</p>
                            
                            <p className="answer" data-toggle="modal" data-target="#myModal" onClick={this.openModalHandler}><b>D:</b> Quyết định thành lập Mặt trận Việt Minh để đoàn kết, tập hợp lực lượng cách mạng nhằm mục tiêu giải phóng dân tộc.</p> */}
                            <div className="answer " onClick={this.openModalHandler}>A: Đáp án đầu tiên nhưng thử một cái
                            đáp án dài coi sao.</div>
                            <div className="answer "  onClick={this.openModalHandler}>B: Đáp án thứ hai.</div>
                            <div className="answer " >C: Đáp án thứ ba.</div>
                            <div className="answer ">D: Đáp án thứ tư.</div>
                            <Modal
                                className="modal"
                                answer={this.state.answer}
                                show={this.state.isShowing}
                                close={this.closeModalHandler}
                                onAnswer={this.props.onAnswer}
                                onChangeQuestion={this.onChangeQuestion}
                                changeStop={this.changeStop}
                                style={this.state.isShowing ? { display: 'block' } : { display: 'none'} }
                            />
                        </div>
                    
                    </div>
            </div>
        );
    }

    onChangeQuestion = () => {
        clearInterval(this.state.timePlay);
        let { timePlay } = this.state;
        this.setState({ time: 15, session: 0, stop: false });
        let count = 0;
        let { session } = this.state;
        const { stop } = this.state;
        if (session === 0) {
            timePlay = setInterval(() => {
                let { time } = this.state;
                time--;
                count++;
                if (session === 0) session++;
                if (stop === true) {
                    clearInterval(this.state.timePlay);
                    count = 0;
                    this.setState({ time: 15, session: 0, stop: false });
                }
                this.setState({
                    time: time,
                })
                // console.log(count)
                if (count === 15) {
                    
                    clearInterval(this.state.timePlay); 
                    this.props.onAnswer('');
                    this.onChangeQuestion();
                    this.setState({ time: 15, session: 0 });
                }
            }, 1000);
        }
        this.setState({ timePlay });
    }
    
    openModalHandler = answer => {
        this.setState({
            isShowing: true,
            answer,
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }

    changeStop = value => {
        this.setState({ stop: value });
    }

}

const mapStateToProps = state => {
    return {
        questions: state.questions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onGetQuestionList: () => dispatch({ type: types.GET_QUESTIONLIST }),
        // onGetQuestionInRound: listId => dispatch({ type: types.GET_QUESTION_IN_ROUND, listId }),
        onAnswer: answer => dispatch({type: types.ANSWER, answer})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestOne);

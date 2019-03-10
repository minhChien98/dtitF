import React, { Component } from 'react';
import './../../styles/play.css';
import Modal from './../../components/modal';
import * as types from './../../constants/ActionTypes';
import { connect } from 'react-redux';

class ContestOne extends Component {
    state = {
        isShowing: false,
        currentQuestion: 0,
    }

    componentWillMount() {
        const { history } = this.props;
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login');
        } else {
            const questionList = JSON.parse(localStorage.getItem('listQuestion'));
            this.props.onGetQuestionInRound(questionList[0]._id);
        }
    }

    render() {
        const name = localStorage.getItem('name');
        const { currentQuestion } = this.state;
        const { questions } = this.props;
        let currentQuestionContent = {};
        if (questions.questions)
            currentQuestionContent = questions.questions[currentQuestion].questId;
        return (
            <div>
                <div className="card cardFixed">
                        <div className="card-body">
                            Chào mừng <b>{name}</b> đã đến với cuộc thi <b>Ánh
                                Sáng Soi Đường</b>!
                        </div>
                    </div>
            
                    <div className="col-8 container">
                        <div className="time col-2">
                            <img
                                src="./images/time-png-png-512px-ico-icns-512.png" alt="time" width="60px" height="60px" />
                            <span style={{verticalAlign: "middle"}}><b>15s</b></span>
                        </div>
                        <div className="card bg-warning">
                    <div className="card-body question">
                        <b>Câu {currentQuestion + 1}:</b> {currentQuestionContent.content}
                    </div>
                    </div>
                    <div className="mt-5">
                        <div style={{position: 'relative'}}>
                            {currentQuestionContent.options ? currentQuestionContent.options.map((option, index) => {
                                return (
                                    <p className="answer" key={index} data-toggle="modal" onClick={this.openModalHandler} data-target="#myModal"><b>{option.numbering.toUpperCase()}:</b> {option.answer}. </p>
                                );
                            }) : ''}
                            
                                
                            {/* <p className="answer" data-toggle="modal" data-target="#myModal" onClick={this.openModalHandler}><b>B:</b> Quyết định thành lập Mặt trận Việt Minh để đoàn kết, tập hợp lực lượng cách mạng nhằm mục tiêu giải phóng dân tộc.</p>
                            
                            <p className="answer" data-toggle="modal" data-target="#myModal" onClick={this.openModalHandler}><b>C:</b> Đưa nhiệm vụ giải phóng dân tộc lên hàng đầu.</p>
                            
                            <p className="answer" data-toggle="modal" data-target="#myModal" onClick={this.openModalHandler}><b>D:</b> Quyết định thành lập Mặt trận Việt Minh để đoàn kết, tập hợp lực lượng cách mạng nhằm mục tiêu giải phóng dân tộc.</p> */}
                           
                            <Modal
                                className="modal"
                                show={this.state.isShowing}
                                close={this.closeModalHandler}
                                style={this.state.isShowing ? { display: 'block' } : { display: 'none'} }
                            />
                        </div>
                    </div>
                    </div>
            </div>
        );
    }
    
    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }
}

const mapStateToProps = state => {
    return {
        questions: state.questions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetQuestionList: () => dispatch({ type: types.GET_QUESTIONLIST }),
        onGetQuestionInRound: listId => dispatch({ type: types.GET_QUESTION_IN_ROUND, listId })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestOne);

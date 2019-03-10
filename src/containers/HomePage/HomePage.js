import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard } from 'mdbreact';
import * as types from './../../constants/ActionTypes';
import { connect } from 'react-redux';

class HomePage extends Component {

    componentWillMount() {
        const { history } = this.props;
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login');
        } else {
            this.props.onGetQuestionList();
        }
    }

    render() {
        const name = localStorage.getItem('name');
        return (
            <MDBContainer>
                <MDBRow style={{ height: '100px' }}/>
                <MDBRow>
                    <MDBCol md="2" />
                    <MDBCol md="8">
                        <MDBCard style={{ padding: '10px' }}>
                            Chào mừng bạn {name} đã đến với cuộc thi Ánh sáng soi đường năm 2019
                        </MDBCard>
                        <button type="button" className="btn btn-primary" onClick={() => this.toRedirect('contestOne')}>Bắt đầu</button>
                    </MDBCol>
                    <MDBCol md="2" />
                </MDBRow>
            </MDBContainer>
        );
    }

    toRedirect = slug => {
        const questionList = JSON.parse(localStorage.getItem('listQuestion'));
        this.props.onGetQuestionInRound(questionList[0]._id);
        this.props.history.push(`/${slug}`);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetQuestionList: () => dispatch({ type: types.GET_QUESTIONLIST }),
        onGetQuestionInRound: listId => dispatch({ type: types.GET_QUESTION_IN_ROUND, listId })
    };
}

export default connect(null, mapDispatchToProps)(HomePage);
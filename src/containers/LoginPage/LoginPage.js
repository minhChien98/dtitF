import React, { Component } from 'react';
import * as types from './../../constants/ActionTypes';
import { connect } from 'react-redux'
import './../../styles/style.css';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: '',
            pass: '',
        }
    }

    componentDidUpdate() {
        const { user, history } = this.props;
        if (user.success) {
            history.push('/');
        }
    }

    render() {
        const { studentId, pass } = this.state;
        return (
            <div className="col-6 container mt-10">
            <div className="wrapper fadeInDown mt-5">
                <div id="formContent">
                    <div className="card cardTop">
                        <div className="card-body">
                            ĐĂNG NHẬP TÀI KHOẢN
                        </div>
                    </div>

                    <form onSubmit={this.handleSubmit} className="mt-5">
                        <input
                            type="text"
                            id="login"
                            className="fadeIn second"
                            name="studentId"
                            placeholder="Mã sinh viên"
                            onChange={this.handleChange}
                            value={studentId}
                        />
                        <input
                            type="password"
                            id="password"
                            className="fadeIn third"
                            name="pass"
                            placeholder="Mật khẩu"
                            onChange={this.handleChange}
                            value={pass}
                        />
                        <input type="submit" className="fadeIn fourth mt-3" value="Đăng nhập"/>
                    </form>
                    <hr />
                    <p className="fadeIn fourth">Bạn chưa có tài khoản?</p>
                    <input type="button" className="fadeIn fourth" onClick={() => this.toRedirect('register')} value="Đăng ký"/>
                </div>
            </div>
        </div>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        const { studentId, pass } = this.state;
        const user = {
            acc: studentId,
            pass,
        }
        this.props.onLogin(user);
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    toRedirect = slug => {
        // console.log(this.props.history)
        this.props.history.push(`/${slug}`);
    }

    onKeyDown = event => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          this.handleSubmit(event);
        }
    };
}

const mapStateToProps = state =>{
    return {
        user : state.user
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch({ type: types.LOGIN, user }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

import React, { Component } from 'react';
import './../../style/main.css';
import * as types from './../../constants/ActionTypes';
import Login from './../../components/Login';
import Register from './../../components/Register';
import { connect } from 'react-redux'

class LoginPage extends Component {
    render() {
        return (
            <div className="col-4 container main">
                <button type="button" className="btn mt-2 btn-login" onClick={this.toLogin}>Đăng nhập</button>
                &nbsp;
            <button type="button" className="btn mt-2 btn-register" onClick={this.toRegister}>Đăng ký</button>
                <div className="mt-2 form" id="form-login">
                    <Login />
                </div>
                <div className="mt-2 form" id="form-register">
                    <Register
                        onRegister={this.onRegister}
                        toLogin={this.toLogin}
                    />
                </div>
            </div>
        );
    }



    toLogin = () => {
        document.getElementById('form-login').style.display = "block";
        document.getElementById('form-register').style.display = "none";
    }
    toRegister = () => {
        document.getElementById('form-login').style.display = "none";
        document.getElementById('form-register').style.display = "block";
    }
    onRegister = user => {
        this.props.onRegister(user);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: user => dispatch({ type: types.REGISTER, user }),
    };
}

export default connect(null, mapDispatchToProps)(LoginPage);

import React, { Component } from 'react';
import * as types from './../../constants/ActionTypes';
import { connect } from 'react-redux';
import './../../styles/style.css';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            studentId: '',
            phone: '',
            pass: '',
        };
    }
    
    componentDidUpdate() {
        const { user, history } = this.props;
        if (user.success) {
            history.push('/login');
            this.props.onReserNoti();
      }
      if (user.error){
          window.alert("Đăng kí thất bại!");
          this.props.onReserNoti();
        }
    }

    render() {
        const { studentId, pass, name, phone } = this.state;
        return (
            <div className="col-md-6 col-sm-10 container">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="card cardTop">
                        <div className="card-body">
                         ĐĂNG KÝ TÀI KHOẢN
                        </div>
                      </div>

                    <form onSubmit={this.handleSubmit} className="mt-5">
                        <input
                            type="text"
                            className="fadeIn second"
                            name="studentId"
                            placeholder="Mã sinh viên"
                            onChange={this.handleChange}
                            value={studentId}
                        />
                        <input
                            type="text"
                            className="fadeIn third"
                            name="name"
                            placeholder="Họ và tên"
                            onChange={this.handleChange}
                            value={name}
                        />
                        <input
                            type="text"
                            className="fadeIn third"
                            name="phone"
                            placeholder="Số điện thoại"
                            onChange={this.handleChange}
                            value={phone}
                        />
                        <input
                            type="password"
                            className="fadeIn third"
                            name="pass"
                            placeholder="Mật khẩu"
                            onChange={this.handleChange}
                            value={pass}
                        />
                        <input
                            type="submit"
                            className="fadeIn fourth mt-3"
                            value="Đăng ký"
                            onSubmit={this.handleSubmit}
                        />
                        
                    </form>
                    <hr />
                    
                    <p className="fadeIn fourth">Bạn đã có tài khoản?</p>
                    <input type="button" className="fadeIn fourth"
                            value="Đăng nhập" onClick={() => this.toRedirect('login')}/>
                </div>
            </div>
        </div>
        );
    }

    
    handleSubmit = e => {
        e.preventDefault();
        const { name, studentId, phone, pass } = this.state;
        const user = {
            name,
            studentId,
            phone,
            pass,
        }
        this.props.onRegister(user);
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    toRedirect = slug => {
        this.props.history.push(`/${slug}`);
    }

}

const mapStateToProps = state =>{
    return {
        user : state.user
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onRegister: user => dispatch({ type: types.REGISTER, user }),
        onReserNoti: () => dispatch({ type: types.RESET_NOTI }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

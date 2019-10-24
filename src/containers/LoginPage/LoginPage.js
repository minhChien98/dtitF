import React, { Component } from "react";
import * as types from "./../../constants/ActionTypes";
import { connect } from "react-redux";
import "./../../styles/style.css";
// const socket = socketIOClient(SOCKET_BASE);
import socketIOClient from "socket.io-client";
import { SOCKET_BASE } from "../../config";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      pass: ""
    };
  }

  componentWillMount() {
    this.props.onReserNoti();
  }

  componentDidMount() {
    window.socketIO.on("auth", data => {
      if (data.code === 3) {
        localStorage.setItem("userId", data.user._id);
        // localStorage.setItem('token', data.token);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("studentId", data.user.studentId);
      }
    });
  }

  componentWillReceiveProps(props) {
    const { user, history } = props;
    if (user.successLogin) {
      // socket.emit('login', { command: 1000, token: user.token });

      // socket.on('login', () => {
      const socket = socketIOClient(SOCKET_BASE);
      window.socketIO = socket;
      socket.emit("login", { command: 1000, token: user.token }); //login
      // });

      if (user.role === "admin") {
        history.push("/admin");
      } else {
        history.push("/");
      }
      this.props.onReserNoti();
    }
    if (user.error) {
      window.alert("Sai tên tài khoản hoặc mật khẩu!");
      this.props.onReserNoti();
    }
  }

  render() {
    const { studentId, pass } = this.state;
    return (
      <div className="col-md-6 col-sm-10 container ">
        <div className="wrapper fadeInDown" style={{ paddingBottom: "10px" }}>
          <div id="formContent">
            <div className="card cardTop">
              <div className="card-body">ĐĂNG NHẬP</div>
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
              <input
                type="submit"
                className="fadeIn fourth mt-3"
                id="btnLogin"
                value="Đăng nhập"
              />
            </form>
            <hr />
            <p className="fadeIn fourth">Bạn chưa có tài khoản?</p>
            <input
              type="button"
              className="fadeIn fourth"
              onClick={() => this.toRedirect("register")}
              value="Đăng ký"
            />
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
      pass
    };
    // socket.emit('login', { user })
    this.props.onLogin(user);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toRedirect = slug => {
    // console.log(this.props.history)
    this.props.history.push(`/${slug}`);
  };

  onKeyDown = event => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.handleSubmit(event);
    }
  };
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch({ type: types.LOGIN, user }),
    onReserNoti: () => dispatch({ type: types.RESET_NOTI })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

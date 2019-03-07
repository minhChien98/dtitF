import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="mt-7"></div>
                    <form className="col-10 mt-3 container">
                    <div className="form-group">
                        <label htmlFor="text">Mã sinh viên:</label>
                        <input type="text" className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Mật khẩu:</label>
                        <input type="password" className="form-control" id="pwd" />
                    </div>
                    <button type="submit" className="btn mb-3">Đăng nhập</button>
                </form>
            </React.Fragment>
        );
    }
}

export default Login;
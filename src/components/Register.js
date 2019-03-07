import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: '',
            phone: '',
            password: '',
            name: '',
        };
    }

    // componentDidUpdate() {
    //     const { user } = this.props;
    //     if (user.success) {
    //         this.props.toLogin();
    //     }
    // }

    render() {
        return (
            <div className="col-12">
                <form className="col-10 mt-3 container" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="text">Mã sinh viên:</label>
                        <input
                        type="text"
                        className="form-control"
                        name="studentId"
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Họ và tên:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Mật khẩu:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="pass"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Số điện thoại:</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn mb-3">Đăng ký</button>
                </form>
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
    
}

export default Register;
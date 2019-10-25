import React, { Component } from "react";
import { connect } from "react-redux";
import {
  // MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import { SCORE } from "../../config";
import "./../../styles/style.css";

class ScoreBoard extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    fetch(SCORE, {
      method: "GET"
    })
      .then(result => result.json())
      .then(data => {
        this.setState({
          data: data.data.filter(item => String(item.role.name) === "user")
        });
      });
    setInterval(() => {
      fetch(SCORE, {
        method: "GET"
      })
        .then(result => result.json())
        .then(data => {
          this.setState({
            data: data.data.filter(item => String(item.role.name) === "user")
          });
        });
    }, 5000);
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <MDBRow style={{ height: "100px" }} />
        <MDBRow>
          <MDBCol md="1" />
          <MDBCol md="10">
            <MDBCard style={{ padding: "10px" }}>
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th style={{ width: "300px" }}>STT</th>
                    <th style={{ width: "400px" }}>Mã sinh viên</th>
                    <th style={{ width: "400px" }}>Tên</th>
                    <th>Điểm</th>
                    <th>Trạng thái</th>
                    <th>Trạng thái online</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {this.state.data && this.state.data.length > 0
                    ? this.state.data.map((item, index) => (
                        <tr key={item._id}>
                          <td style={{ width: "300px" }}>{index + 1}</td>
                          <td style={{ width: "400px" }}>{item.studentId}</td>
                          <td style={{ width: "400px" }}>{item.name}</td>
                          <td>{item.score || 0}</td>
                          <th>{item.status ? "Đang chơi" : "Bị loại"}</th>
                          <td>
                            <div
                              style={{
                                width: "40px",
                                height: "20px",
                                background: `${
                                  item.isOnline ? "#00FF00" : "#A4A4A4"
                                }`
                              }}
                            ></div>
                          </td>
                        </tr>
                      ))
                    : null}
                </MDBTableBody>
              </MDBTable>
            </MDBCard>
          </MDBCol>
          <MDBCol md="1" />
        </MDBRow>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onLogin: user => dispatch({ type: types.LOGIN, user }),
//     onReserNoti: () => dispatch({ type: types.RESET_NOTI }),
//   };
// }

export default connect(
  null,
  null
)(ScoreBoard);

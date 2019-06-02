import React, { Component } from 'react';
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBCard } from 'mdbreact';
import './../../styles/style.css';
import Modal from './../../components/modal';
import { Bar } from "react-chartjs-2";

const chartOptions = {
  showScale: true,
  pointDot: true,
  showLines: false,

  title: {
    display: true,
    text: 'Kết quả',
    titleFontSize: 35,
  },
  plugins: {
    datalabels: {
      color: 'black'
    }
  },
  legend: {
    display: false,
    labels: {
      boxWidth: 50,
      fontSize: 10,
      fontColor: '#bbb',
      padding: 5,
    }
  },
  responsive: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 100
      }
    }]
  }
}

class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      options: [],
      data: null,
      id: '',
      isShowing: false,
      answer: '',
      currentQuestion: 0,
      answered: false,
      showChart: false,
      dataBar: {
        labels: ["A", "B", "C", "D"],
        datasets: [
          {
            backgroundColor: "#FF8000",
            borderColor: "rgba(75,192,192,1)",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [30, 20, 10, 10]
          }
        ]
      },
    }
  }

  componentDidMount() {
    window.socketIO.on('receiveQuestionView', res => {
      this.setState({ data: res, content: res.message.content, options: res.message.options });
    });
    window.socketIO.on('resultView', res => {
      const dataRaw = [res.message.a, res.message.b, res.message.c, res.message.d];
      const dataBarRaw =  {
        labels: ["A", "B", "C", "D"],
        datasets: [
          {
            backgroundColor: "#FF8000",
            borderColor: "rgba(75,192,192,1)",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataRaw,
          }
        ]
      };
      this.setState({ dataBar: dataBarRaw, showChart: true});
    });
  }

  render() {
    if (this.state.data === null) {
      return (
          <MDBContainer>
            <MDBRow style={{ height: '100px' }} />
            <MDBRow>
              <MDBCol md="2" />
              <MDBCol md="8">
                <MDBCard style={{ padding: '10px' }}>
                  Bạn đã bị loại. Hãy chờ để tham gia cứu trợ
              </MDBCard>
              </MDBCol>
              <MDBCol md="2" />
            </MDBRow>
          </MDBContainer>
      );
    } else if (this.state.data !== null && this.state.answered === false) {
      return (
        <div className="col-md-8 col-sm-11 container">
          <div className="card bg-primary">
            <div className="card-body question">
              {/* <b>Câu {currentQuestion + 1}:</b> {this.state.content} */}
              <b>Câu hỏi:</b> {this.state.content}
            </div>
          </div>

          <div style={{ position: 'relative' }} className="answerContent">
            {this.state.options ? this.state.options.map((option, index) => {
              return (
                <div className="answer" key={index} data-toggle="modal" disabled onClick={() => this.openModalHandler(option.numbering)}>{option.numbering.toUpperCase()}: {option.answer}. </div>
              );
            }) : ''}

            <Modal
              className="modal"
              answer={this.state.answer}
              show={this.state.isShowing}
              correctAnswer=""
              handleAns={this.handleAns}
              close={this.closeModalHandler}
              style={this.state.isShowing ? { display: 'block' } : { display: 'none' }}
            />
          </div>
        </div>
      );
    } else if (this.state.answered && this.state.showChart === false) {
      return (
        <MDBContainer>
          <MDBRow style={{ height: '100px' }} />
          <MDBRow>
            <MDBCol md="2" />
            <MDBCol md="8">
              <MDBCard style={{ padding: '10px' }}>
                Cảm ơn bạn đã tham gia cứu trợ. Hãy chờ kết quả cứu trợ!
              </MDBCard>
            </MDBCol>
            <MDBCol md="2" />
          </MDBRow>
        </MDBContainer>
      );
    } else if (this.state.showChart) {
      return (
        <MDBContainer>
            <MDBRow style={{ height: '100px' }} />
            <MDBRow>
              <MDBCol md="2" />
              <MDBCol md="8">
                <MDBCard style={{ padding: '10px' }}>
                  <Bar data={this.state.dataBar} options={chartOptions} />
                </MDBCard>
              </MDBCol>
              <MDBCol md="2" />
            </MDBRow>
          </MDBContainer>
      );
    }
  }

  openModalHandler = answer => {
    this.setState({
      isShowing: true,
      answer,
    });
  }

  handleAns = () => {
    this.setState({ answered: true });
  }

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
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

export default connect(null, null)(ViewPage);

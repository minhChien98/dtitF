import React from 'react';

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div
        className="modal1 fade"
        id="myModal"
        role="dialog"
        style={{
          opacity: this.props.show ? '1' : '0',
        }}
      >
        <div
          className="modal-dialog box"
        // style={{
        //     opacity: this.props.show ? '1' : '0',
        //     display: this.props.show ? 'block' : 'none',
        // }}
        >

          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#56baed' }}>
              <h4 className="modal-title">Thông báo</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={this.props.close}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Bạn đã chắc chắn với câu trả lời của mình?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.close}>Không</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onAnswer}>Xác nhận</button>
            </div>
          </div>

        </div>
      </div>

    );
  }

  onAnswer = () => {
    const { answer, correctAnswer, id, options } = this.props;
    if (correctAnswer !== '') {
      let currentAns;
      options.forEach(item => {
        if (answer === item.numbering) {
          currentAns = item.answer;
        }
      });
      const result = correctAnswer === currentAns;
      this.props.onAnswer(result, id);
      this.props.handleDisableAnswer();
    } else {
      window.socketIO.emit('admin', { command: 3000, message: answer, });
      this.props.handleAns();
    }

    this.props.close();
  }
}

export default Modal;

import React from 'react';

class Modal extends React.Component {
    render () {
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
                        <p>Bạn đã chắc chắn với câu trả lời của mình không?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.close}>Không</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Xác nhận</button>
                    </div>
                </div>
                
                </div>
            </div>

        );
    }
}

export default Modal;

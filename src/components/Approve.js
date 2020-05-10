import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewStudentForm1 from "./NewStudentForm1";

class Approve extends Component {
  
  /// this state basically holds whether modal appeared on the screen or not
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {

    var title = "Fill your details";
    var button = <Button onClick={this.toggle}>+</Button>;

   
    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewStudentForm1
              resetState={this.props.resetState}
              toggle={this.toggle}
              pk = {this.props.pk}
              student={this.props.student}
            />
          </ModalBody>
        </Modal>
       
      </Fragment>
    );
  }
}

export default Approve;
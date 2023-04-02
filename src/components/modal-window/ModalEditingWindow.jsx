import React from "react";
import { Modal } from "react-bootstrap";
import EditForm from "../form/EditForm";

const ModalEditingWindow = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-success"
        >
          Editing Form For Room {props.roomNo}-{props.type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditForm
          id={props.id}
          paymentMethods={props.paymentMethod}
          type={props.type}
          roomNo={props.roomNo}
          price={props.price}
          tips={props.tip}
          checkingIn={props.checkIn}
          checkingOut={props.checkOut}
          guestName={props.username}
          guestEmail={props.email}
          bookings={props.bookings}
          setBookings={props.setBookings}
          setNotifySuccess={props.setNotifySuccess}
          modalHide={props.onHide}
        />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button>Book</Button>
        <Button onClick={props.onHide} variant={"danger"}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ModalEditingWindow;

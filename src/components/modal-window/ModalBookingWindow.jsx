import React from "react";
import { Modal } from "react-bootstrap";
import GuestForm from "../form/GuestForm";

const ModalBookingWindow = (props) => {
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
          Booking Form For Room {props.roomNo}-{props.type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GuestForm
          setNotifySuccess={props.setNotifySuccess}
          type={props.type}
          roomNo={props.roomNo}
          price={props.price}
          bookings={props.bookings}
          setBookings={props.setBookings}
          hideModal={props.onHide}
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

export default ModalBookingWindow;

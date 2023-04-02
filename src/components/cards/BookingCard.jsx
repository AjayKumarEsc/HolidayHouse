import moment from "moment";
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import ModalEditingWindow from "../modal-window/ModalEditingWindow";
import "./BookingCard.css";

const BookingCard = ({
  id,
  durationHours,
  type,
  amount,
  price,
  username,
  email,
  checkIn,
  checkOut,
  roomNo,
  tip,
  paymentMethod,
  bookings,
  setBookings,
  setNotifySuccess,
}) => {
  const [modalShow, setModalShow] = useState(false);
  console.log(durationHours, type, amount, username, email, checkIn, checkOut);
  const duration = (inTime) => {
    let now = moment(inTime);
    let end = moment();
    let duration = moment.duration(now.diff(end));
    let hours = duration.asHours();
    return Math.trunc(hours);
  };
  const cancelBooking = (id) => {
    const newBooking = bookings.filter((data) => data.id !== id);
    setBookings(newBooking);
    setNotifySuccess({
      bool: true,
      message: "Cancel Successful!",
    });
  };
  const handleCancelBooking = (id, checkIn) => {
    const durationDiff = duration(checkIn);
    let message;
    if (durationDiff >= 48) {
      message = `Full refund possible and amount to be refunded is ₹${amount}`;
    } else if (durationDiff >= 24 && durationDiff <= 48) {
      const refund = amount / 2;
      message = `Partial refund possible and amount to be refunded is ₹${refund} `;
    } else {
      message = "No refund possible! duration is less than 24 hrs";
    }
    const cancel = window.confirm(
      `${message}\nAre you sure you want to cancel your booking ?`
    );
    console.log(cancel);
    if (cancel) {
      cancelBooking(id);
    }
    return;
  };
  return (
    <>
      <ModalEditingWindow
        id={id}
        price={price}
        tip={tip}
        checkIn={checkIn}
        checkOut={checkOut}
        type={type}
        username={username}
        email={email}
        roomNo={roomNo}
        show={modalShow}
        bookings={bookings}
        paymentMethod={paymentMethod}
        setBookings={setBookings}
        onHide={() => setModalShow(false)}
        setNotifySuccess={setNotifySuccess}
      />
      <Card className="booking-card">
        <Card.Body>
          <Card.Title className="booking-card-title">
            Booking Details
          </Card.Title>
          <Card.Text>
            <p>
              <span className="bold-text">Email:</span> {email}
            </p>
            <p>
              <span className="bold-text">Name:</span> {username}
            </p>
            <p>
              <span className="bold-text">Duration:</span> {durationHours} hours
            </p>
            <p>
              <span className="bold-text">Room Type:</span> {type}
            </p>
            <p>
              <span className="bold-text">Room Number:</span> {roomNo}
            </p>
            <p>
              <span className="bold-text">Total Amount:</span> ₹{amount}
            </p>
            <p>
              <span className="bold-text">Booking date:</span>
              {moment(checkIn).format(" Do MMM YY h:mm")}
            </p>
            <p>
              <span className="bold-text">Check Out:</span>
              {moment(checkOut).format(" Do MMM YY h:mm")}
            </p>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="booking-card-footer">
          <Button
            onClick={() => setModalShow(true)}
            variant="primary"
            className="booking-card-button"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="booking-card-button"
            onClick={() => handleCancelBooking(id, checkIn)}
          >
            Cancel
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default BookingCard;

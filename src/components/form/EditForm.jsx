import React, { useState } from "react";
import Datetime from "react-datetime";
import { Form, Button } from "react-bootstrap";
import moment from "moment";
import Notification from "../Notification";
import "./GuestForm.css";

const EditForm = ({
  id,
  bookings,
  setBookings,
  type,
  roomNo,
  price,
  tips,
  guestName,
  guestEmail,
  paymentMethods,
  checkingIn,
  checkingOut,
  setNotifySuccess,
  modalHide,
}) => {
  console.log(guestName);
  console.log(guestEmail);
  console.log(paymentMethods);
  const [username, setUsername] = useState(guestName);
  const [email, setEmail] = useState(guestEmail);
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethods.paymentMethod
  );
  const [tip, setTip] = useState(tips);
  const [errors, setErrors] = useState([]);
  const [checkIn, setCheckIn] = useState(checkingIn);
  const [checkOut, setCheckOut] = useState(checkingOut);

  const isValidDate = (currentDate, selectedDate) => {
    return currentDate.isAfter(moment().subtract(1, "day"));
  };

  // duration checking
  const duration = (outTime, inTime) => {
    let end = moment(inTime);
    let now = moment(outTime);
    let duration = moment.duration(now.diff(end));
    let hours = duration.asHours();
    return Math.trunc(hours);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = [];

    if (!username) {
      newErrors.push("Please enter a username.");
    }
    if (!email) {
      newErrors.push("Please enter an email address.");
    }
    if (!paymentMethod) {
      newErrors.push("Please choose a payment method.");
    }
    if (!checkIn) {
      newErrors.push("Please select a Booking date and time.");
    }
    if (!checkOut) {
      newErrors.push("Please select a check-out date and time.");
    }

    if (newErrors.length === 0) {
      const durationHours = duration(checkOut, checkIn);
      if (durationHours < 1) {
        newErrors.push("not valid duration at least 1hr");
        setErrors(newErrors);
        return;
      }
      const amount =
        parseFloat(durationHours) * parseFloat(price) + parseFloat(tip);

      const index = bookings.findIndex((data) => data.id === id);
      // console.log(index);
      // console.log(bookings[index]);
      bookings[index].duration = durationHours;
      bookings[index].type = type;
      bookings[index].amount = amount;
      bookings[index].guestName = username;
      bookings[index].email = email;
      bookings[index].checkIn = checkIn;
      bookings[index].checkOut = checkOut;
      setBookings(bookings);
      setNotifySuccess({
        bool: true,
        message: "Booking updated",
      });
      modalHide();
    } else {
      setErrors(newErrors);
      //   setTimeout(() => setErrors([]), 3000);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errors.map((error, index) => (
        <Notification
          show={true}
          time={3}
          message={error}
          key={index}
          variant={"danger"}
        />
      ))}
      <Form.Group className="form-group" controlId="formBasicUsername">
        <Form.Label className="label">Name</Form.Label>
        <Form.Control
          className="form-control"
          type="text"
          placeholder="Enter Name"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="form-group" controlId="formBasicEmail">
        <Form.Label className="label">Email </Form.Label>
        <Form.Control
          className="form-control"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="form-group" controlId="formBasicPayment">
        <Form.Label className="label">Payment Method</Form.Label>
        <Form.Control
          className="form-control"
          as="select"
          value={paymentMethod}
          onChange={(event) => setPaymentMethod(event.target.value)}
        >
          <option value="">Choose payment method</option>
          <option value="cash">Cash</option>
          <option value="upi">UPI</option>
          <option value="upi">Card</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="form-group" controlId="formBasicTip">
        <Form.Label className="label">Tip</Form.Label>
        <Form.Control
          className="form-control"
          type="number"
          placeholder="Enter tip amount"
          value={tip}
          onChange={(event) => {
            Number(event.target.value) < 0
              ? setTip(0)
              : setTip(parseFloat(event.target.value));
          }}
        />
      </Form.Group>

      <Form.Group className="form-group" controlId="formBasicCheckIn">
        <Form.Label className="label">Booking date</Form.Label>
        <Datetime
          isValidDate={isValidDate}
          value={checkIn}
          onChange={(value) => setCheckIn(value._d)}
        />
      </Form.Group>

      <Form.Group className="form-group" controlId="formBasicCheckOut">
        <Form.Label className="label">Check-out</Form.Label>
        <Datetime
          isValidDate={isValidDate}
          value={checkOut}
          onChange={(value) => setCheckOut(value._d)}
        />
      </Form.Group>

      <Button
        className="form-btn btn-primary"
        style={{ width: "100%" }}
        variant="primary"
        type="submit"
      >
        Update
      </Button>
    </Form>
  );
};

export default EditForm;

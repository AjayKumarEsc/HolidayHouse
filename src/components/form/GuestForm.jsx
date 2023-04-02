import React, { useState } from "react";
import Datetime from "react-datetime";
import { Form, Button } from "react-bootstrap";
import moment from "moment";
import Notification from "../Notification";
import "./GuestForm.css";
import { v4 as uuid } from "uuid";

const GuestForm = ({
  setNotifySuccess,
  bookings,
  setBookings,
  type,
  roomNo,
  price,
  hideModal,
}) => {
  //getting unique id
  const uniqueId = uuid();
  const id = uniqueId.slice(0, 8);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [tip, setTip] = useState(0);
  const [errors, setErrors] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
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

  const checkInBetweenTime = (checkIn, checkOut, toCheckTime) => {
    var time = moment(toCheckTime),
      beforeTime = moment(checkIn),
      afterTime = moment(checkOut);

    if (
      time.isSame(beforeTime) ||
      time.isBetween(beforeTime, afterTime) ||
      time.isSame(afterTime)
    ) {
      return false;
    }
    // room is available
    return true;
  };
  const checkOverlappingTime = (roomNo, checkIn) => {
    const filterByRoom = bookings.filter((data) => data.roomNo === roomNo);
    if (filterByRoom.length === 0) {
      // room is available
      return true;
    } else {
      for (let data of filterByRoom) {
        if (!checkInBetweenTime(data.checkIn, data.checkOut, checkIn)) {
          return false;
        }
      }
    }
    return true;
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
    console.log(newErrors);

    if (newErrors.length === 0) {
      // console.log({
      //   username,
      //   email,
      //   paymentMethod,
      //   tip,
      //   checkIn,
      //   checkOut,
      // });
      const durationHours = duration(checkOut, checkIn);
      console.log(durationHours);
      if (durationHours < 1) {
        newErrors.push("not valid duration at least 1hr");
        setErrors(newErrors);
        // setTimeout(() => setErrors([]), 3000);

        return;
      }
      const amount =
        parseFloat(durationHours) * parseFloat(price) + parseFloat(tip);

      const availableRoom = checkOverlappingTime(roomNo, checkIn);
      if (availableRoom) {
        setBookings([
          ...bookings,
          {
            id: id,
            duration: durationHours,
            type: type,
            amount: amount,
            guestName: username,
            email: email,
            checkIn: checkIn,
            checkOut: checkOut,
            price: price,
            tip: tip,
            roomNo: roomNo,
            paymentMethod: { paymentMethod },
          },
        ]);
        setNotifySuccess(true);
        hideModal();
      } else {
        newErrors.push("Room Already Occupied");
        setErrors(newErrors);
      }
    } else {
      setErrors(newErrors);
      //   setTimeout(() => setErrors([]), 3000);
    }
  };

  return (
    <Form className = " guestbg" onSubmit={handleSubmit}>
      {errors.map((error, index) => (
        <Notification
          show={true}
          message={error}
          time={3}
          key={index}
          variant={"danger"}
          cb={(bool) => setErrors([])}
        />
      ))}
      <Form.Group className="form-group" controlId="formBasicUsername">
        <Form.Label className="label">Name</Form.Label>
        <Form.Control
          className="form-control"
          type="text"
          placeholder="Enter  Name"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="form-group" controlId="formBasicEmail">
        <Form.Label className="label">Email</Form.Label>
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
        Book
      </Button>
    </Form>
  );
};

export default GuestForm;

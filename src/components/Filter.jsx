import moment from "moment";
import React from "react";
import { Button, Form } from "react-bootstrap";
import Datetime from "react-datetime";
import roomData from "./data/roomData";
import "./Filter.css";

const Filter = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  roomType,
  setRoomType,
  bookings,
  setFitlteredBookingData,
  filteredBookingsData,
  roomNo,
  setRoomNo,
}) => {
  const checkInBetweenTime = (startTime, endTime, checkIn, checkOut) => {
    var start = moment(checkIn),
      end = moment(checkOut),
      beforeTime = moment(startTime),
      afterTime = moment(endTime);

    if (start.isBetween(beforeTime, afterTime)) {
      return true;
    }
    // room is available
    return false;
  };
  const getBookingsInBetween = (bookingsData, startTime, endTime) => {
    return bookingsData.filter((data) =>
      checkInBetweenTime(startTime, endTime, data.checkIn, data.checkOut)
    );
  };
  const getBookingByRoomType = (roomType, bookingsData) => {
    return bookingsData.filter((data) => roomType.includes(data.type));
  };
  const filterData = (startTime, endTime, roomType, roomNum) => {
    if (startTime != "" || endTime != "")
      setFitlteredBookingData(
        getBookingsInBetween(bookings, startTime, endTime)
      );
    if (roomType == "ALL") {
      setFitlteredBookingData(getBookingByRoomType(["A", "B", "C"], bookings));
    } else if (roomType == "A") {
      setFitlteredBookingData(getBookingByRoomType(["A"], bookings));
    } else if (roomType == "B") {
      setFitlteredBookingData(getBookingByRoomType(["B"], bookings));
    } else if (roomType == "C") {
      setFitlteredBookingData(getBookingByRoomType(["C"], bookings));
    }
    setFitlteredBookingData(bookings.filter((data) => data.roomNo === roomNum));
  };

  const handleApply = (e) => {
    e.preventDefault();
    filterData(startTime, endTime, roomType);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setStartTime("");
    console.log(startTime);
    setEndTime("");
    setRoomNo("");
    setRoomType("All");
    setFitlteredBookingData(bookings);
  };
  return (
    <Form onSubmit={(e) => handleApply(e)} onReset={(e) => handleReset(e)}>
      <Form.Group className="form-group" controlId="startDate">
        <Form.Label className="label">Booking Date & Time:</Form.Label>
        <Datetime
          value={startTime}
          onChange={(value) => setStartTime(value._d)}
        />
      </Form.Group>

      <Form.Group className="form-group" controlId="endDate">
        <Form.Label className="label">Check-Out Date & Time:</Form.Label>
        <Datetime value={endTime} onChange={(value) => setEndTime(value._d)} />
      </Form.Group>
      <Form.Group controlId="roomType">
        <Form.Label className="label">Room Type:</Form.Label>
        <Form.Control
          as="select"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="">All</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="roomNo">
        <Form.Label className="label">Room Number:</Form.Label>
        <Form.Control
          as="select"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
        >
          <option value="">All</option>
          {roomData.map((data, index) =>
            data.roomNo.map((room, j) => (
              <option key={j} value={room}>
                {room}
              </option>
            ))
          )}
        </Form.Control>
      </Form.Group>
      <Form.Group className="filter-footer">
        <Button variant="primary" type="submit">
          Apply
        </Button>
        <Button variant="secondary" type="reset">
          Reset
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Filter;

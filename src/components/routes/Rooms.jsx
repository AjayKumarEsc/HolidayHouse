import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RoomsCard from "../cards/RoomsCard";
import roomData from "../data/roomData";
import Notification from "../Notification";
import "./Rooms.css";

const Rooms = ({ bookings, setBookings }) => {
  const [notifySuccess, setNotifySuccess] = useState(false);
  return (
    <Container>
      <Notification
        show={notifySuccess}
        message={"Booking Successful!"}
        variant={"success"}
        time={5}
        cb={(bool) => setNotifySuccess(bool)}
      />
      {roomData.map((room, i) => (
        <Row key={i} className="mb-4">
          {room.roomNo.map((number, j) => (
            <Col key={j} className="m-2">
              <RoomsCard
                setNotifySuccess={setNotifySuccess}
                bookings={bookings}
                setBookings={setBookings}
                price={room.rent}
                type={room.type}
                roomNo={number}
                image={room.image}
              />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Rooms;

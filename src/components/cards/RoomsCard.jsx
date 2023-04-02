import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import "./RoomsCard.css";
import ModalBookingWindow from "../modal-window/ModalBookingWindow";

function RoomsCards({
  image,
  roomNo,
  type,
  price,
  bookings,
  setBookings,
  setNotifySuccess,
}) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <ModalBookingWindow
        price={price}
        type={type}
        roomNo={roomNo}
        show={modalShow}
        bookings={bookings}
        setBookings={setBookings}
        setNotifySuccess={setNotifySuccess}
        onHide={() => setModalShow(false)}
      />
      <Card className="card" style={{ width: "18rem", marginTop: "10px" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Card.Title>
                  {roomNo}-{type}
                </Card.Title>
              </Col>
              <Col>
              <Button
                className="card-btn"
                variant="primary"
                onClick={() => setModalShow(true)}
              >
                Book Room
              </Button>
              </Col>
            </Row>
            <Row >
            <Col>
                <Card.Title className="price">₹ {price}/hr</Card.Title>
              </Col>
              <Col></Col>
            </Row>
       
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default RoomsCards;

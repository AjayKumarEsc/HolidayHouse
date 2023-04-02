import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Notification = ({ show, message, variant, time, cb }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    const timeout = setTimeout(() => {
      setVisible(false);
      cb(false);
    }, time * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [show]);

  if (visible) {
    return <Alert variant={variant}>{message}</Alert>;
  }

  return null;
};

export default Notification;

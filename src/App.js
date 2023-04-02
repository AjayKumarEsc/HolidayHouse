import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/navigation/Header";
import Bookings from "./components/routes/Bookings";
import Rooms from "./components/routes/Rooms";
import "./App.css";

const App = () => {
  const [bookings, setBookings] = useState([]);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Rooms bookings={bookings} setBookings={setBookings} />}
        ></Route>
        <Route
          path="/Bookings"
          element={<Bookings bookings={bookings} setBookings={setBookings} />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;

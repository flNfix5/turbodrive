import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const Booking = () => {
  const { carId } = useParams();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleBooking = () => {
    alert(`Foglalás sikeres! Autó ID: ${carId}, Dátum: ${date.toLocaleDateString()}`);
    navigate("/Homepage");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Foglalás</h2>
      <p>Válassz egy dátumot az autó lefoglalásához:</p>
      <Calendar onChange={setDate} value={date} />
      <button
        onClick={handleBooking}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Foglalás és Fizetés
      </button>
    </div>
  );
};

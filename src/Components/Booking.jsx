import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export const Booking = () => {
  const { carId } = useParams(); // Az URL-ből kinyert autó ID
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token; // A navigáció során átadott token
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const handleBooking = async () => {
    if (dateRange.length === 2) {
      const [rentalDate, returnDate] = dateRange;
      const userid = localStorage.getItem("userId");

      // Ellenőrizzük, hogy a rentalDate kisebb-e, mint a returnDate
      if (rentalDate >= returnDate) {
        alert("A kezdő dátumnak korábbinak kell lennie, mint a záró dátum.");
        return;
      }


       let reservationData = {
        customerId: userid, // Ezt az értéket dinamikusan kell beállítani a tényleges felhasználó ID-jára
        carId: parseInt(carId, 10),
        rentalDate: rentalDate.toISOString(),
        returnDate: returnDate.toISOString(),
        status: "Pending",
      };
alert(JSON.stringify (reservationData));
      try {
        const response = await axios.post("http://localhost:5000/api/Reservation", reservationData, {
          headers: {
            
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          alert(`Foglalás sikeres! Autó ID: ${carId}, Időszak: ${rentalDate.toLocaleDateString()} - ${returnDate.toLocaleDateString()}`);
          navigate("/Homepage");
        } else {
          alert("Hiba történt a foglalás során.");
        }
      } catch (error) {
        console.error("Foglalási hiba:", error);
        alert("Hiba történt a foglalás során.");
      }
    } else {
      alert("Kérjük, válasszon ki egy érvényes dátumtartományt a foglaláshoz.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Foglalás</h2>
      <p>Válasszon ki egy dátumtartományt az autó lefoglalásához:</p>
      <Calendar
        onChange={setDateRange}
        value={dateRange}
        selectRange={true}
      />
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

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sha256 from "js-sha256";
import * as THREE from "three";

export const Regisztracio = () => {
    const [formData, setFormData] = useState({
        felhasznaloNev: "",
        jelszo: "",
        teljesNev: "",
        email: "",
    });
    const navigate = useNavigate();
    const vantaRef = useRef(null);

      const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
      }

      function generateSalt(length) {
        const karakterek = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let salt = "";
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * karakterek.length);
            salt += karakterek[randomIndex];
        }
        
        return salt;
    };

    const handleSubmit = async () => {
        const salt = generateSalt(64);
        const hashedPassword = sha256(formData.jelszo + salt);

        const requestBody = {
            id: 0,
            felhasznaloNev: formData.felhasznaloNev,
            teljesNev: formData.teljesNev,
            salt,
            hash: hashedPassword,
            email: formData.email,
            jogosultsag: 1,
            aktiv: 0,
            reggisztracioDatuma: new Date().toISOString(),
            fenykepUtvonal: "default.jpg",
        };

        console.log(requestBody);

        try {
            const response = await axios.post("http://localhost:5000/api/Registry", requestBody);
            alert(response.data);
            navigate("/");
        }catch(error) {
            console.error(error)
            alert("Hiba történt a regisztráció során")
        }
    }
      return(
        <div ref={vantaRef} style={{ height: "90vh", color: "#fff", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2>Regisztráció</h2>
            <input
              type="text"
              name="felhasznaloNev"
              placeholder="Felhasználónév"
              value={formData.felhasznaloNev}
              onChange={handleChange}
              style={{ margin: "10px", padding: "10px", borderRadius: "5px", width: "80%" }}
            />
            <input
              type="password"
              name="jelszo"
              placeholder="Jelszó"
              value={formData.jelszo}
              onChange={handleChange}
              style={{ margin: "10px", padding: "10px", borderRadius: "5px", width: "80%" }}
            />
            <input
              type="text"
              name="teljesNev"
              placeholder="Teljes név"
              value={formData.teljesNev}
              onChange={handleChange}
              style={{ margin: "10px", padding: "10px", borderRadius: "5px", width: "80%" }}
            />
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              style={{ margin: "10px", padding: "10px", borderRadius: "5px", width: "80%" }}
            />
            <button
              onClick={handleSubmit}
              style={{
                margin: "10px",
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#1e90ff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Regisztráció
            </button>
      </div>
    </div>
      );
}
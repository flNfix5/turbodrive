import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sha256 from "js-sha256";

export const Login = ({ onLogin }) => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const vantaRef = useRef(null);
  const Navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const saltResponse = await axios.post(
        `http://localhost:5000/api/Login/GetSalt/${loginName}`
      );
      const salt = saltResponse.data;
      const tmpHash = sha256(password + salt.toString());
      const loginResponse = await axios.post("http://localhost:5000/api/Login", {
        loginName,
        tmpHash,
      });

      if (loginResponse.status === 200) {
        let userData = loginResponse.data;
        localStorage.setItem("felhasz", JSON.stringify(userData.token));
        setAvatar(`http://images.balazska.nhely.hu/${userData.profilePicturePath}`);
        alert(`Sikeres bejelentkezés! Felhasználó: ${userData.name}`);
        
        // Call onLogin to update isLoggedIn state in App.jsx
        onLogin(userData);
      } else {
        alert("Hiba történt a bejelentkezéskor!");
      }
    } catch (error) {
      alert("Hiba történt: " + error.message);
    }
    finally{ 
      Navigate("/PriceList");
    }
  };

  return (
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
      <h2>Bejelentkezés</h2>
      <input
        type="text"
        placeholder="Felhasználónév"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
        style={{ margin: "10px", padding: "10px", borderRadius: "5px", width: "80%" }}
      />
      <input
        type="password"
        placeholder="Jelszó"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "10px", padding: "10px", borderRadius: "5px", width: "80%" }}
      />
      <button
        onClick={handleLogin}
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
        Bejelentkezés
      </button>
    </div>
    </div>
  );
};
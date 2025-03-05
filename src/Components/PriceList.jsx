import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const PriceList = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  
  // Token lekérése a localStorage-ból
  const token = localStorage.getItem('felhasz'); // Ez fogja meghatározni, hogy be vagyunk-e jelentkezve

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Car/CarAll/token');
        setCars(response.data);
      } catch (error) {
        alert('Hiba történt: ' + error.message);
      }
    };
    fetchCars();
  }, []);

  const statusMap = {
    'Alsó': 'cheap',
    'Közép': 'comfort',
    'Felső': 'exclusive',
    'Luxus': 'luxus',
  };

  const handleBookNow = (productName) => {
    if (!token) {
      alert('Kérlek jelentkezz be a foglaláshoz!');
      return;
    }
    
    const templateParams = {
      to_email: 'nagy.pista.kkszki@gmail.com',
      product_name: productName,
    };
  };

  const handleDetailsClick = (productName) => {
    navigate(`/Details/${productName}`);
  };

  return (
    <div className="container-fluid d-flex flex-fill justify-content-center align-items-start p-0">
      <div className="row">
        {cars.map((carItem, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card bg-dark text-white">
              <img
                src={`http://files.turbodrive.nhely.hu/${statusMap[carItem.status]}/${carItem.fenykep}`}
                className="card-img-top"
                alt={carItem.productName}
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{carItem.brand} {carItem.model} </h5>
                <p className="card-text">Ár: {carItem.rentalPricePerDay} Ft</p>
                <button
                  onClick={() => handleDetailsClick(carItem.productName)}
                  className="btn btn-danger"
                >
                  Részletek
                </button>

                {/* Lefoglalás gomb */}
                <button
                  onClick={() => handleBookNow(carItem.productName)}
                  className="btn btn-primary mt-2"
                  disabled={!token} // Gomb inaktív, ha nincs bejelentkezve
                  style={{
                    backgroundColor: token ? '#dc3545' : '#ccc', // Aktív (piros) és inaktív (szürke) gomb színek
                    cursor: token ? 'pointer' : 'not-allowed', // Kattinthatóság
                  }}
                >
                  Lefoglalás
                </button>

                {/* Figyelmeztetés, ha nincs bejelentkezve */}
                {!token && (
                  <p className="text-danger mt-2">Be kell jelentkezni a foglaláshoz!</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
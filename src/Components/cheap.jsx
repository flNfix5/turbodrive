import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Cheap = ({ token }) => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Car/Categories/token?category=cheap`);
        setCars(response.data);
      } catch (error) {
        alert('Hiba történt: ' + error.message);
      }
    };
    fetchCars();
  }, [token]);

  const handleDetailsClick = (id) => {
    navigate(`/Details/${id}`);
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
    // A foglalás logikáját itt érdemes hozzáadni (pl. email küldés).
  };

  return (
    <div className="row d-flex flex-wrap justify-content-start">
      {cars.map((carItem, index) => (
        <div key={index} className="col-lg-4 col-md-6 mb-4">
          <div className="card bg-dark text-white">
            <img
              src={`http://files.turbodrive.nhely.hu/Images/${carItem.fenykep}`}
              className="card-img-top"
              alt={carItem.productName}
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{carItem.brand} {carItem.model} </h5>
              <p className="card-text">Ár: {carItem.rentalPricePerDay} Ft</p>
              <button onClick={() => handleDetailsClick(carItem.id)} className="btn btn-danger">
                Részletek
              </button>
              <button
                onClick={() => handleBookNow(carItem.productName)}
                className="btn btn-primary mt-2"
                disabled={!token} // Gomb inaktív, ha nincs bejelentkezve
                style={{
                  backgroundColor: token ? '#fffff' : '#ccc', // Aktív és inaktív szín
                  cursor: token ? 'pointer' : 'not-allowed',
                }}
              >
                Lefoglalás
              </button>
              {!token && (
                <p className="text-danger mt-2">Be kell jelentkezni a foglaláshoz!</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

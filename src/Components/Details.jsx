import React, { useState, useEffect, useContext } from 'react';
import { useGlobalContext } from '../Context/GlobalContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Details = ({ token, Id }) => {
  const {apiUrl, ftpUrl} = useGlobalContext();
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      alert(ftpUrl);
      try {
        let url = apiUrl+"Car/CarDetails/"+"token"+","+id;
        console.log(url);
        const response = await axios.get(url);
        
        // Log the response to see the data structure
        console.log('API Response:', response.data);

        // Check if the data is correctly set
        if (response.data) {
          setCarDetails(response.data);
        } else {
          setError('Nincs elérhető adat.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Hiba történt a termék adatainak betöltése közben!');
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <div className="container text-center mt-5" style={{ color: 'white' }}><h2>Betöltés...</h2></div>;
  }

  if (error) {
    return <div className="container text-center mt-5" style={{ color: 'white' }}><h2>{error}</h2></div>;
  }

  if (!carDetails) {
    return <div className="container text-center mt-5" style={{ color: 'white' }}><h2>Nincs ilyen termék!</h2></div>;
  }

  return (
    <div className="container mt-5" style={{ color: 'white' }}>
      <h2>{carDetails.brand} {carDetails.model} részletes információi</h2>
      <div className="row">
        <div className="col-lg-6">
          <img
            src={`${ftpUrl}${carDetails.fenykep}`}
            alt={carDetails.id}
            className="img-fluid rounded"
            style={{ height: 'auto', maxWidth: '100%' }}
          />
        </div>
        <div className="col-lg-6">
          <div className="card bg-dark text-white shadow-sm">
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'white' }}>Jellemzők</h5>
              <ul className="list-unstyled">
                <li><strong>Ár:</strong> {carDetails.rentalPricePerDay} Ft/nap</li>
                <li><strong>Motor:</strong> {carDetails.motor_type}</li>
                <li><strong>Fogyasztás:</strong> {carDetails.fuel_consumption} l/100 km</li>
                <li><strong>Ülések:</strong> {carDetails.seats} fő</li>
                <li><strong>Lóerő:</strong> {carDetails.power_hp}</li>
                <li><strong>Hajtás:</strong> {carDetails.drivetrain}</li>
                <li><strong>Váltó:</strong>{carDetails.gearbox}</li>
              </ul>
              <p style={{color: 'white'}}><strong>Leírás:</strong> {carDetails.description}</p>
              <button className="btn btn-success mt-3">Foglalás</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

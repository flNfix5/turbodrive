import React from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

export const PriceList = ({ activePriceCategory, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleBookNow = (productName) => {
    const templateParams = {
        to_email: 'nagy.pista.kkszki@gmail.com',
        product_name: productName,
      };
    
      emailjs.send('your_service_id', 'your_template_id', templateParams, 'your_user_id')
        .then(response => {
          alert('Sikeresen lefoglalta a terméket. E-mail elküldve.');
        })
        .catch(err => {
          console.error('Error sending email:', err);
        });
  };

  const handleDetailsClick = (productName) => {
    navigate(`/Details/${productName}`);
  };

  return (
    <div className="container-fluid d-flex flex-fill justify-content-center align-items-start p-0">
      <div>
        {activePriceCategory === 'cheap' && (
          <div>
            <div className="contact-container container mt-4 pb-2 bg-light rounded border-1 border-dark">
              <div className="container-fluid border-1 border-bottom border-dark fs-3">
                Alsó kategória
              </div>
              <div className="container-fluid fs-6">
                <div className="container-fluid mt-5 pt-2 pb-2 d-flex flex-column flex-sm-row border-1 border-top border-bottom border-dark">
                  <img height="300" width="300" src="Images/Cars/cheap/fordfocus.png" className="rounded img-thumbnail p-0" alt="cheap" />
                  <div className="container-fluid d-flex flex-column justify-content-center align-items-center fs-3">
                      2018 Ford Focus SE Hatchback
                    <br />
                    <span className="fs-5">15.000Ft</span>
                    <button onClick={() => handleDetailsClick('fordfocus')} className="btn btn-primary mt-2">Részletek</button>
                    <button 
                      onClick={() => handleBookNow('fordfocus')} 
                      className="btn btn-secondary mt-2"
                      disabled={!isLoggedIn} // Gomb inaktív, ha nincs bejelentkezve
                      style={{
                        backgroundColor: isLoggedIn ? '#6c757d' : '#ccc', // Aktív és inaktív szín
                        cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Lefoglalás
                    </button>
                    {!isLoggedIn && <p style={{ color: 'red' }}>Be kell jelentkezni a foglaláshoz!</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activePriceCategory === 'comfort' && (
          <div>
            <div className="contact-container container mt-4 pb-2 bg-light rounded border-1 border-dark">
              <div className="container-fluid border-1 border-bottom border-dark fs-3">
                Közép kategória
              </div>
              <div className="container-fluid fs-6">
                <div className="container-fluid mt-5 pt-2 pb-2 d-flex flex-column flex-sm-row border-1 border-top border-bottom border-dark">
                  <img height="300" width="300" src="Images/Cars/comfort/fordfocus.png" className="rounded img-thumbnail p-0" alt="comfort" />
                  <div className="container-fluid d-flex flex-column justify-content-center align-items-center fs-3">
                     2018 Ford Focus SE Hatchback
                    <br />
                    <span className="fs-5">15.000Ft</span>
                    <button onClick={() => handleDetailsClick('fordfocus')} className="btn btn-primary mt-2">Részletek</button>
                    <button 
                      onClick={() => handleBookNow('fordfocus')} 
                      className="btn btn-secondary mt-2"
                      disabled={!isLoggedIn} // Gomb inaktív, ha nincs bejelentkezve
                      style={{
                        backgroundColor: isLoggedIn ? '#6c757d' : '#ccc', // Aktív és inaktív szín
                        cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Lefoglalás
                    </button>
                    {!isLoggedIn && <p style={{ color: 'red' }}>Be kell jelentkezni a foglaláshoz!</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
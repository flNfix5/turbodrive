import { GlobalProvider } from "./Context/GlobalContext";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { Homepage } from './Components/Homepage';
import { PriceList } from './Components/PriceList';
import { Contacts } from './Components/Contacts';
import { Conditions } from './Components/Conditions';
import { Login } from './Components/Login';
import { Regisztracio } from './Components/Regisztracio';
import { Details } from './Components/Details';
import { Luxus } from './Components/Luxus';
import { Cheap } from './Components/cheap';
import { Comfort } from './Components/Comfort';
import { Exclusive } from './Components/Exclusive';

export const App = () => {
  const [activePriceCategory, setActivePriceCategory] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  const handlePriceCategoryClick = (category) => {
    setActivePriceCategory(category);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const token = user ? user.token : '';
  const id = 0;

  return (
    <GlobalProvider>
    <Router>
      <div className="container-fluid position-absolute h-100 d-flex p-0">
        <div className="d-flex flex-column flex-fill">
          <div id="Header" className="container-fluid bg-light">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
              <div className="container-fluid">
                <span className="navbar-brand">
                  <img src="/Images/logo.jpg" height="100" width="100" alt="Logo" />
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav-0">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav-0">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink to="/Homepage" className="nav-link">Kezdőlap</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/Conditions" className="nav-link">Bérlési feltételek</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                        Árak
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to="/PriceList" className="nav-link" onClick={() => handlePriceCategoryClick('PriceList')}>Összes</NavLink>
                        </li>
                        <li>
                          <NavLink to="/cheap" className="nav-link" onClick={() => handlePriceCategoryClick('cheap')}>Alsó kategória</NavLink>
                        </li>
                        <li>
                          <NavLink to="/comfort" className="nav-link" onClick={() => handlePriceCategoryClick('comfort')}>Középső kategória</NavLink>
                        </li>
                        <li>
                          <NavLink to="/exclusive" className="nav-link" onClick={() => handlePriceCategoryClick('exclusive')}>Felső kategória</NavLink>
                        </li>
                        <li>
                          <NavLink to="/Luxus" className="nav-link" onClick={() => handlePriceCategoryClick('luxus')}>Luxus kategória</NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/Contacts" className="nav-link">Elérhetőségek</NavLink>
                    </li>
                    {!isLoggedIn ? (
                      <>
                        <li className="nav-item">
                          <NavLink to="/Login" className="nav-link">Bejelentkezés</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/Regisztracio" className="nav-link">Regisztráció</NavLink>
                        </li>
                      </>
                    ) : (
                      <li className="nav-item">
                        <button className="nav-link" onClick={handleLogout}>Kijelentkezés</button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          <div id="Main" className="d-flex flex-fill overflow-auto">
            <Routes>
              <Route path="/Homepage" element={<Homepage />} />
              <Route path="/PriceList" element={<PriceList activePriceCategory={activePriceCategory} token={token} />} />
              <Route path="/Cheap" element={<Cheap token={token} />} />
              <Route path="/Comfort" element={<Comfort token={token} />} />
              <Route path="/Exclusive" element={<Exclusive token={token} />} />
              <Route path="/Luxus" element={<Luxus token={token}  />} />
              <Route path="/Contacts" element={<Contacts />} />
              <Route path="/Conditions" element={<Conditions />} />
              <Route path="/Login" element={<Login onLogin={handleLogin} />} />
              <Route path="/Regisztracio" element={<Regisztracio />} />
              <Route path="/Details/:id" element={<Details  token={token} id={id}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </GlobalProvider>
  );
};

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


export const App = () => {
  const [activeTab, setActiveTab] = useState('Homepage');
  const [activePriceCategory, setActivePriceCategory] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePriceCategoryClick = (category) => {
    setActivePriceCategory(category);
    setActiveTab('PriceList');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);  // Reset login state
  };

  return (
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
                      <NavLink to="/Homepage" className="nav-link" activeClassName="active">
                        Kezdőlap
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/Conditions" className="nav-link" activeClassName="active">
                        Bérlési feltételek
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                        Árak
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to="/PriceList" className="nav-link" activeClassName="active" onClick={() => handlePriceCategoryClick('cheap')}>
                            Alsó kategória
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/PriceList" className="nav-link" activeClassName="active" onClick={() => handlePriceCategoryClick('comfort')}>
                            Középső kategória
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/PriceList" className="nav-link" activeClassName="active" onClick={() => handlePriceCategoryClick('exclusive')}>
                            Felső kategória
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/PriceList" className="nav-link" activeClassName="active" onClick={() => handlePriceCategoryClick('luxury')}>
                            Luxus kategória
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/Contacts" className="nav-link" activeClassName="active">
                        Elérhetőségek
                      </NavLink>
                    </li>
                    {!isLoggedIn ? (
                      <>
                        <li className="nav-item">
                          <NavLink to={"/Login"} className="nav-link" activeClassName="active">
                            Bejelentkezés
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to={"/Regisztracio"} className="nav-link" activeClassName="active">
                            Regisztráció
                          </NavLink>
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
              <Route path="/PriceList" element={<PriceList activePriceCategory={activePriceCategory} isLoggedIn={isLoggedIn} />} />
              <Route path="/Contacts" element={<Contacts />} />
              <Route path="/Conditions" element={<Conditions />} />
              <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/Regisztracio" element={<Regisztracio />} />
              <Route path="/Details/:productName" element={<Details />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};
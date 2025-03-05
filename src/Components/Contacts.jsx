// src/Contacts.js
import React from 'react';

export const Contacts = () => {
  return (
    <div className="container mt-4 pb-2 bg-light rounded border-1 border-dark opacity-75">
      <div className="container-fluid fs-2 text-uppercase me-5 pe-5 border-1 border-bottom border-dark">
        Üzletvezetők
      </div>

      <div className="container-fluid fs-6 me-5 pe-5">
        <div className="container mt-2 border-1 border-start border-dark">
          <span className="fs-5 fw-bold">Egri Dominik</span>
          <br />
          <button className="copy-btn bg-light border-0" data-DC="egrid@kkszki.hu">
            <i className="bi bi-clipboard"></i>
          </button>
          <input type='email' className="bg-light" value="egrid@kkszki.hu" id="egrid@kkszki.hu" readOnly />
        </div>

        <div className="container mt-2 border-1 border-start border-dark">
          <span className="fs-5 fw-bold">Halascsák Szabolcs</span>
          <br />
          <button className="copy-btn bg-light border-0" data-DC="halascsaksz@kkszki.hu">
            <i className="bi bi-clipboard"></i>
          </button>
          <input type="email" className="bg-light" value="halascsaksz@kkszki.hu" id="halascsaksz@kkszki.hu" readOnly />
        </div>
      </div>
    </div>
  );
};
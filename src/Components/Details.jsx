import React from 'react';
import { useParams } from 'react-router-dom';

export const Details = () => {
  const { productName } = useParams();

  return (
    <div className="container">
      <h2>{productName} részletes információi</h2>
      <p>Részletes leírás...</p>
    </div>
  );
};
import React from 'react';

export const Conditions = () => {
  return (
    <div className="container mt-4 color-light bg-secondary rounded border-1 border-dark opacity-75 font-monospace text-black">
      <h2>Gépjármű kölcsönzés általános feltételei:</h2>
      <h4>Természetes személy bérlő esetén:</h4>
      <ul id='szines'>
        <li>18. betöltött életév</li>
        <li>Gépjárművezetésre alkalmas állapot</li>
        <li>Kaució megfizetése</li>
        <li>A bérleti szerződésben maghatározott feltételek elfogadása</li>
        <li>Érvényes személyazonosító igazolvány</li>
        <li>Érvényes lakcímet igazoló hatósági igazolvány</li>
        <li>Érvényes vezetői engedély</li>
        <li>Elérhetőség / telefon szám, e-mail cím</li>
      </ul>
      <h4>Jogi személy / cég bérlő esetén:</h4>
      <ul>
        <li>Cégkivonat</li>
        <li>Aláírási címpéldány</li>
        <li>Cégbélyegző</li>
        <li>Elérhetőség / telefon szám, e-mail cím</li>
        <li>A gépjármű vezetőjére vonatkozóan a természetes személy bérlőre meghatározott feltételek</li>
      </ul>
    </div>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
const NotFound = () => {
  return (
    <main className="absent">
      <h1 className="absent__title">404</h1>
      <h2 className="absent__subtitle">Страница не найдена</h2>
      <Link className="absent__link" to="/">
        Назад
      </Link>
    </main>
  );
};

export default NotFound;

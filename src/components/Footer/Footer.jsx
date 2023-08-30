import React from 'react';
import './Footer.css';
const Footer = () => (
  <footer className="footer">
    <span className="footer__affiliation">Учебный проект Яндекс.Практикум х BeatFilm.</span>
    <div className="footer__container">
      <span className="footer__copyright">&#169; 2020</span>
      <nav className="footer__navigation">
        <a className="footer__link" href="https://practicum.yandex.ru/">
          Яндекс.Практикум
        </a>
        <a className="footer__link" href="https://github.com/am-avraam">
          Github
        </a>
      </nav>
    </div>
  </footer>
);

export default Footer;

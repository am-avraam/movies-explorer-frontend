import React from 'react';
import './Portfolio.css';
const Portfolio = () => (
  <section className="portfolio">
    <header className="portfolio__header">Портфолио</header>
    <section className="portfolio__links">
      <a className="portfolio__link" href="https://github.com/am-avraam/mesto">
        Статичный сайт
      </a>
      <a className="portfolio__link" href="https://github.com/am-avraam/blog-platform">
        Адаптивный сайт
      </a>
      <a className="portfolio__link" href="https://github.com/am-avraam/react-mesto-api-full-gha">
        Одностраничное приложение
      </a>
    </section>
  </section>
);

export default Portfolio;

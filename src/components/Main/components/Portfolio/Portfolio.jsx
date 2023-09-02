import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__content">
        <header className="portfolio__header">Портфолио</header>
        <section className="portfolio__links">
          <a className="portfolio__link" href="https://github.com/am-avraam/mesto" target="_blank" rel="noreferrer">
            Статичный сайт
          </a>
          <a
            className="portfolio__link"
            href="https://github.com/am-avraam/blog-platform"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <a
            className="portfolio__link"
            href="https://github.com/am-avraam/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </section>
      </div>
    </section>
  );
}

export default Portfolio;

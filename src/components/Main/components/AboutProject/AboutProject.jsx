import React from 'react';
import './AboutProject.css';
import NavTab from '../NavTab/NavTab';

const AboutProject = () => (
  <section className="description">
    <NavTab title="О проекте"></NavTab>
    <div className="description__items">
      <div className="description__item">
        <header className="description__fact">Дипломный проект включал 5 этапов</header>
        <p className="description__par">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
        </p>
      </div>

      <div className="description__item">
        <header className="description__fact">На выполнение диплома ушло 5 недель</header>
        <p className="description__par">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
        </p>
      </div>
    </div>

    <section className="description__terms">
      <figure className="description__term">
        <div className="description__container description_container_backend">
          <span className="description__period description__period_purpose_backend">1 неделя</span>
        </div>
        <figcaption className="description__caption">Back-end</figcaption>
      </figure>

      <figure className="description__term">
        <div className="description__container description_container_frontend">
          <span className="description__period description__period_purpose_frontend">4 недели</span>
        </div>
        <figcaption className="description__caption">Front-end</figcaption>
      </figure>
    </section>
  </section>
);

export default AboutProject;

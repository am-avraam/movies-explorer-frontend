import React from 'react';
import './Techs.css';
import NavTab from './../NavTab/NavTab';
import { techs } from './constants';
const Techs = () => {
  return (
    <section className="techs">
      <NavTab title="Технологии" />
      <h3 className="techs__title">7 технологий</h3>
      <h4 className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </h4>
      <ul className="techs__list">
        {techs.map((tech) => (
          <li key={tech} className="techs__item">
            <span className="techs__name">{tech}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Techs;

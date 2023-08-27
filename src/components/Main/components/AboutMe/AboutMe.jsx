import React from 'react';
import './AboutMe.css';
import NavTab from './../NavTab/NavTab';

const AboutMe = () => {
  return (
    <section className="myself">
      <NavTab title="Студент" />
      <div className="myself__container">
        <section className="myself__personal">
          <h2 className="myself__name">Амир</h2>
          <h3 className="myself__data">Фронтенд-разработчик, 25 лет</h3>
          <p className="myself__intro">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam, asperiores assumenda, atque
            consectetur dignissimos ducimus expedita ipsam laudantium natus obcaecati officiis porro possimus quia
            quisquam sequi tempora totam unde.
          </p>
          <a className="myself__link" href="https://github.com/am-avraam">
            Github
          </a>
        </section>

        <img
          className="myself__photo"
          src="https://i.pinimg.com/originals/59/ff/a3/59ffa3ff268e21bc0bb57435d49467a7.jpg"
          alt="фото студента"
        />
      </div>
    </section>
  );
};

export default AboutMe;

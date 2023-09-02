import React from 'react';
import './AboutMe.css';
import NavTab from '../NavTab/NavTab';

function AboutMe() {
  return (
    <section className="myself">
      <div className="myself__content">
        <NavTab title="Студент" />
        <div className="myself__container">
          <section className="myself__personal">
            <h2 className="myself__name">Амир</h2>
            <h3 className="myself__data">Фронтенд-разработчик, 25 лет</h3>
            <p className="myself__intro">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать
              музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После
              того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
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
      </div>
    </section>
  );
}

export default AboutMe;

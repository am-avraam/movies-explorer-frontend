import React from 'react';
import AboutProject from './components/AboutProject/AboutProject';
import Promo from './components/Promo/Promo';
import Techs from './components/Techs/Techs';
import AboutMe from './components/AboutMe/AboutMe';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import './main.css';

function Main() {
  return (
    <>
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;

import React from 'react';
import AboutProject from './components/AboutProject/AboutProject';
import Promo from './components/Promo/Promo';
import Techs from './components/Techs/Techs';
import AboutMe from './components/AboutMe/AboutMe';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  );
}

export default Main;

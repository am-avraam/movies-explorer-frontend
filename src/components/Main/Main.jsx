import React from 'react';
import './Main.css';
import AboutProject from './components/AboutProject/AboutProject';
import Promo from './components/Promo/Promo';
import Techs from './components/Techs/Techs';
import AboutMe from './components/AboutMe/AboutMe';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Main() {
  return (
    <>
      {/*<Header />*/}
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

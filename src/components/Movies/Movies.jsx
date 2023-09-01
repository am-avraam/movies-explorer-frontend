import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
const Movies = ({ saved }) => {
  return (
    <>
      <div className="movies">
        {/*<Header />*/}
        <main className="movies__main">
          <SearchForm />
          <MoviesCardList saved={saved} />
          <button className="movies__expand">Еще</button>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Movies;

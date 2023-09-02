import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
const Movies = ({ saved }) => {
  return (
    <>
      <main className="movies">
        <div className="movies__main">
          <SearchForm />
          <MoviesCardList saved={saved} />
          <button className="movies__expand">Еще</button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Movies;

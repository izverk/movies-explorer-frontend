import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ isMoviesLoading }) {

  return (
    <section className="movies">
      <SearchForm />
      {isMoviesLoading ? <Preloader /> : <MoviesCardList />}
    </section>
  );
}

export default Movies;
import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ isMoviesLoading }) {

  return (
    <main className="movies">
      <SearchForm />
      {isMoviesLoading ? <Preloader /> : <MoviesCardList />}
    </main>
  );
}

export default Movies;
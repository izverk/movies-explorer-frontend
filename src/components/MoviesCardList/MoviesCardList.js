import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { movies } from '../../utils/constants';

function MoviesCardList() {

  return (
    <ul className='movies-card-list app__wide-section'>
      {movies.map(movie => {
        return (
          <MoviesCard
            key={movie.id}
            movie={movie}
          />
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
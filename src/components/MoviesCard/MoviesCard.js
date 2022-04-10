import React from 'react';
import './MoviesCard.css';
import moviePoster from '../../images/pic__COLOR_pic(1).jpg'

function MoviesCard({ movie }) {

  return (
    <div className='movies-card'>
      <div className='movies-card__poster-container'>
        <div className='movies-card__poster-wrapper'>
          <img className='movies-card__poster-photo'
            src={moviePoster}
            alt='Постер фильма' />
        </div>
      </div>
      <div className='movies-card__caption-container'>
        <div className='movies-card__name-and-like-container'>
          <span className='movies-card__name'>
            {movie.nameRU}
          </span>
          <button className={`movies-card__like-button${movie.isLiked ? ' movies-card__like-button_active' : ''}`}>
          </button>
        </div>
        <span className='movies-card__time'>
          {movie.duration}
        </span>
      </div>
    </div>
  );
}

export default MoviesCard;
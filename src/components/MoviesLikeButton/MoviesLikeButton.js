import React from 'react';
import './MoviesLikeButton.css';

function MoviesLikeButton({ movie }) {

  return (
    <button className={`movies-like-button${movie.isLiked ? ' movies-like-button_active' : ''}`}>
    </button>
  );
}

export default MoviesLikeButton;
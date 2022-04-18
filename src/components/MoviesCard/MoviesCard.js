import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './MoviesCard.css';
import moviePoster from '../../images/pic__COLOR_pic(1).jpg';
import MoviesLikeButton from '../MoviesLikeButton/MoviesLikeButton';
import MoviesDelButton from '../MoviesDelButton/MoviesDelButton';

function MoviesCard({ movie }) {
	return (
		<div className='movies-card'>
			<div className='movies-card__poster-container'>
				<div className='movies-card__poster-wrapper'>
					<img
						className='movies-card__poster-photo'
						src={movie.image.url}
						alt={`Постер к фильму ${movie.nameRU}`}
					/>
				</div>
			</div>
			<div className='movies-card__caption-container'>
				<div className='movies-card__name-and-like-container'>
					<span className='movies-card__name'>{movie.nameRU}</span>
					<Switch>
						<Route path='/movies'>
							<MoviesLikeButton movie={movie} />
						</Route>
						<Route path='/saved-movies'>
							<MoviesDelButton />
						</Route>
					</Switch>
				</div>
				<span className='movies-card__time'>{movie.duration}</span>
			</div>
		</div>
	);
}

export default MoviesCard;

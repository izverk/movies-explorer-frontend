import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './MoviesCard.css';
import MoviesLikeButton from '../MoviesLikeButton/MoviesLikeButton';
import MoviesDelButton from '../MoviesDelButton/MoviesDelButton';

function MoviesCard({ movie }) {
	return (
		<div className='movies-card'>
			<div className='movies-card__poster-container'>
				<a
					className='app-button movies-card__poster-wrapper'
					href={movie.trailerLink}
					rel='noreferrer'
					target='_blank'
					title={movie.trailerLink}>
					<img
						className='movies-card__poster-photo'
						src={movie.image}
						alt={`Постер к фильму ${movie.nameRU}`}
					/>
				</a>
			</div>
			<div className='movies-card__caption-container'>
				<div className='movies-card__name-and-like-container'>
					<span className='movies-card__name'>{movie.nameRU}</span>
					<Switch>
						<Route path='/movies'>
							<MoviesLikeButton movie={movie} />
						</Route>
						<Route path='/saved-movies'>
							<MoviesDelButton movie={movie} />
						</Route>
					</Switch>
				</div>
				<span className='movies-card__time'>{movie.duration}</span>
			</div>
		</div>
	);
}

export default MoviesCard;

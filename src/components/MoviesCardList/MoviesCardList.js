import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
	const [isMoreButtonVisible] = useState(true);

	return (
		<div className='movies-card-list'>
			<ul className='movies-card-list__list'>
				{movies.map((movie) => {
					return <MoviesCard key={movie.id} movie={movie} />;
				})}
			</ul>
			{isMoreButtonVisible && (
				<button
					className='app__link app__button movies-card-list__more-button'
					type='button'>
					Ещё
				</button>
			)}
		</div>
	);
}

export default MoviesCardList;

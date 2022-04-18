import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
	movies,
	isPreloaderVisible,
	setIsPreloaderVisible,
	getAndFilterMovies,
	moviesSearchInputText,
	setMoviesSearchInputText,
	moviesSearchCheckboxState,
	setMoviesSearchCheckboxState,
}) {
	return (
		<main className='movies'>
			<SearchForm
				getAndFilterMovies={getAndFilterMovies}
				moviesSearchInputText={moviesSearchInputText}
				setMoviesSearchInputText={setMoviesSearchInputText}
				moviesSearchCheckboxState={moviesSearchCheckboxState}
				setMoviesSearchCheckboxState={setMoviesSearchCheckboxState}
				setIsPreloaderVisible={setIsPreloaderVisible}
			/>
			{movies &&
				(isPreloaderVisible ? (
					<Preloader />
				) : (
					<MoviesCardList movies={movies} />
				))}
		</main>
	);
}

export default Movies;

import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchResults from '../SearchResults/SearchResults';

import { nothingFoundMessageText } from '../../utils/constants';

function Movies({
	movies,
	isPreloaderVisible,
	setIsPreloaderVisible,
	getAndFilterMovies,
	moviesSearchInputText,
	setMoviesSearchInputText,
	moviesSearchCheckboxState,
	setMoviesSearchCheckboxState,
	badSearchResult,
	setBadSearchResult,
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
				badSearchResult
				setBadSearchResult={setBadSearchResult}
			/>
			{isPreloaderVisible ? (
				<Preloader />
			) : badSearchResult ? (
				<SearchResults badSearchResult={badSearchResult} />
			) : movies ? (
				<MoviesCardList movies={movies} />
			) : null}
		</main>
	);
}

export default Movies;

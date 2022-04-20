import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchResults from '../SearchResults/SearchResults';

function Movies({
	movies,
	isPreloaderVisible,
	setIsPreloaderVisible,
	getAndFilterMovies,
	moviesInputValue,
	setMoviesInputValue,
	shortFilmsCheckboxValue,
	setShortFilmsCheckboxValue,
	badSearchResult,
	setBadSearchResult,
}) {
	return (
		<main className='movies'>
			<SearchForm
				getAndFilterMovies={getAndFilterMovies}
				moviesInputValue={moviesInputValue}
				setMoviesInputValue={setMoviesInputValue}
				shortFilmsCheckboxValue={shortFilmsCheckboxValue}
				setShortFilmsCheckboxValue={setShortFilmsCheckboxValue}
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

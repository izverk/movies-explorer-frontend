import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchResults from '../SearchResults/SearchResults';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

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
	const context = React.useContext(CurrentUserContext);
	const { renderedMovies, setSavedMovies } = context;

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
			) : renderedMovies.length ? (
				<MoviesCardList movies={movies} />
			) : null}
		</main>
	);
}

export default Movies;

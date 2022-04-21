import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchResults from '../SearchResults/SearchResults';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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
	const { renderedMovies } = context;

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
<<<<<<< HEAD
			) : renderedMovies.length ? (
=======
			) : renderedMovies ? (
>>>>>>> b2384b9d64a9668cb1099cc6fef1a488c1ed2704
				<MoviesCardList movies={movies} />
			) : null}
		</main>
	);
}

export default Movies;

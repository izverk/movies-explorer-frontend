import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchResults from '../SearchResults/SearchResults';

function SavedMovies({
	savedMovies,
	movies,
	getAndFilterMovies,
	moviesInputValue,
	setMoviesInputValue,
	shortFilmsCheckboxValue,
	setShortFilmsCheckboxValue,
	badSearchResult,
	setBadSearchResult,
}) {
	return (
		<main className='saved-movies'>
			<SearchForm />
			<MoviesCardList />
		</main>
	);
}

export default SavedMovies;

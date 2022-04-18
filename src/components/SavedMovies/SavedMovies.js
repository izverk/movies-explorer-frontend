import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ savedMovies }) {
	return (
		<main className='saved-movies'>
			<SearchForm />
			<MoviesCardList movies={savedMovies} />
		</main>
	);
}

export default SavedMovies;

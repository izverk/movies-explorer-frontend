import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ isSavedMoviesLoading }) {

    return (
        <main className="saved-movies">
            <SearchForm />
            {isSavedMoviesLoading ? <Preloader /> : <MoviesCardList />}
        </main>
    );
}

export default SavedMovies;
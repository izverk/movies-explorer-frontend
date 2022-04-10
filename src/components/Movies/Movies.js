import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function Movies({ isMoviesLoading }) {

    return (
        <section className="movies">
            <SearchForm />
            {isMoviesLoading && <Preloader />}
        </section>
    );
}

export default Movies;
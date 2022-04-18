import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
	getAndFilterMovies,
	moviesSearchInputText,
	setMoviesSearchInputText,
	moviesSearchCheckboxState,
	setMoviesSearchCheckboxState,
	setIsPreloaderVisible,
}) {
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsPreloaderVisible(() => true);
		getAndFilterMovies();
	};

	const handleInputChange = (e) => {
		setMoviesSearchInputText(e.target.value);
	};

	return (
		<form
			className='search-form'
			noValidate
			onSubmit={handleSubmit}
			name='movies-search-form'>
			<div className='search-form__container'>
				<div className='search-form__input-row'>
					<input
						className='search-form__input'
						type='text'
						name='movie'
						id='movie-input'
						placeholder='Фильм'
						required
						onChange={handleInputChange}
						value={moviesSearchInputText || ''}
					/>
					<button
						className='app__link app__button search-form__button'
						type='submit'
					/>
				</div>
				<FilterCheckbox
					moviesSearchCheckboxState={moviesSearchCheckboxState}
					setMoviesSearchCheckboxState={setMoviesSearchCheckboxState}
				/>
			</div>
		</form>
	);
}

export default SearchForm;

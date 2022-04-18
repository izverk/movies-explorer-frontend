import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { needKeyWordMessageText } from '../../utils/constants';

function SearchForm({
	getAndFilterMovies,
	moviesSearchInputText,
	setMoviesSearchInputText,
	moviesSearchCheckboxState,
	setMoviesSearchCheckboxState,
	setIsPreloaderVisible,
	setBadSearchResult,
}) {
	const handleSubmit = (e) => {
		e.preventDefault();
		// проверка наличия данных в инпуте поиска фильмов
		if (!moviesSearchInputText) {
			setBadSearchResult(needKeyWordMessageText);
			return;
		}
		setBadSearchResult(null);
		setIsPreloaderVisible(true);
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

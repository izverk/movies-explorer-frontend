import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { needKeyWordMessageText } from '../../utils/constants';

function SearchForm({
	getAndFilterMovies,
	moviesInputValue,
	setMoviesInputValue,
	shortFilmsCheckboxValue,
	setShortFilmsCheckboxValue,
	setIsPreloaderVisible,
	setBadSearchResult,
}) {
	const handleSubmit = (e) => {
		e.preventDefault();
		// проверка наличия данных в инпуте поиска фильмов
		if (!moviesInputValue) {
			setBadSearchResult(needKeyWordMessageText);
			return;
		}
		setBadSearchResult(null);
		setIsPreloaderVisible(true);
		getAndFilterMovies();
	};

	const handleInputChange = (e) => {
		setMoviesInputValue(e.target.value);
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
						value={moviesInputValue || ''}
					/>
					<button
						className='app__link app__button search-form__button'
						type='submit'
					/>
				</div>
				<FilterCheckbox
					shortFilmsCheckboxValue={shortFilmsCheckboxValue}
					setShortFilmsCheckboxValue={setShortFilmsCheckboxValue}
				/>
			</div>
		</form>
	);
}

export default SearchForm;

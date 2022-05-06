import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './FilterCheckbox.css';

function FilterCheckbox() {
	const context = React.useContext(CurrentUserContext);
	const {
		shortFilmsCheckboxValue,
		setShortFilmsCheckboxValue,
		shortSavedFilmsCheckboxValue,
		setShortSavedFilmsCheckboxValue,
	} = context;

	// Обработчик изменения значения чек-бокса короткометражек для роута /movies
	const handleMoviesFiltration = (e) => {
		setShortFilmsCheckboxValue(e.target.checked);
		try {
			localStorage.setItem('shortFilmsCheckboxValue', e.target.checked);
		} catch (err) {
			console.log(err);
		}
	};

	// Обработчик изменения значения чек-бокса короткометражек для роута /saved-movies
	const handleSavedMoviesFiltration = (e) => {
		setShortSavedFilmsCheckboxValue(e.target.checked);
	};

	return (
		<label className='filter'>
			<Switch>
				<Route path='/movies'>
					<input
						type='checkbox'
						checked={shortFilmsCheckboxValue}
						className='filter__checkbox'
						name='filterCheckbox'
						onChange={handleMoviesFiltration}
					/>
				</Route>
				<Route path='/saved-movies'>
					<input
						type='checkbox'
						checked={shortSavedFilmsCheckboxValue}
						className='filter__checkbox'
						name='filterCheckbox'
						onChange={handleSavedMoviesFiltration}
					/>
				</Route>
			</Switch>
			<span className='filter__pseudo-checkbox' />
			Короткометражки
		</label>
	);
}

export default FilterCheckbox;

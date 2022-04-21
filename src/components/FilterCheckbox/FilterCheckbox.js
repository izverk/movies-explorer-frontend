import React, { useCallback } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './FilterCheckbox.css';
import { filterWithDuration } from '../../utils/utils';
import { nothingFoundMessageText } from '../../utils/constants';

function FilterCheckbox() {
	const context = React.useContext(CurrentUserContext);
	const {
		movies,
		setShortMovies,
		shortFilmsCheckboxValue,
		setShortFilmsCheckboxValue,
		setBadSearchResult,
	} = context;

	// Обработчик изменения значения чек-бокса короткометражек
	const handleChange = (e) => {
		setShortFilmsCheckboxValue(e.target.checked);
	};
	// Функция включения/выключения фильтра короткометражек
	const filterShortFilms = useCallback(() => {
		if (shortFilmsCheckboxValue) {
			const shortFilms = filterWithDuration(movies);
			if (shortFilms.length) {
				setShortMovies(shortFilms);
			} else {
				setBadSearchResult(nothingFoundMessageText);
			}
		} else {
			setBadSearchResult(null);
		}
	}, [movies, shortFilmsCheckboxValue, setShortMovies, setBadSearchResult]);

	React.useEffect(() => {
		filterShortFilms();
	}, [shortFilmsCheckboxValue, filterShortFilms]);

	return (
		<label className='filter'>
			<input
				type='checkbox'
				checked={shortFilmsCheckboxValue}
				className='filter__checkbox'
				name='filterCheckbox'
				onChange={handleChange}
			/>
			<span className='filter__pseudo-checkbox' />
			Короткометражки
		</label>
	);
}

export default FilterCheckbox;

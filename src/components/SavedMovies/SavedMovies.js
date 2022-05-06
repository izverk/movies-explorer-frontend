import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchResults from '../SearchResults/SearchResults';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { handleDuration, filterByDuration } from '../../utils/utils';
import {} from '../../utils/constants';

function SavedMovies() {
	const context = React.useContext(CurrentUserContext);
	const {
		savedMovies,
		filteredSavedMovies,
		renderedMovies,
		setRenderedMovies,
		shortSavedFilmsCheckboxValue,
		isPreloaderVisible,
		badSearchResult,
		setBadSearchResult,
	} = context;

	// Готовим массив фильмов для рендеринга:
	// - фильтруем по чек-боксу короткометражек
	// - преобразуем числовое поле duration в строку вида "__ ч __ м"
	React.useEffect(() => {
		let renderedFilms;
		// если отфильтрованный по ключевому слову массив не пустой (т.е. была произведена фильтрация сохраненных фильмов по ключевому слову в форме поиска), берем его за основу
		if (filteredSavedMovies.length) {
			renderedFilms = [...filteredSavedMovies];
		} else {
			// в противном случае поиска не было и берем за основу исходный массив сохраненных фильмов
			renderedFilms = [...savedMovies];
		}
		// если стоит чек-бокс, фильтруем короткометражки
		if (shortSavedFilmsCheckboxValue) {
			renderedFilms = filterByDuration(renderedFilms);
		}
		// // дополнительно проверяем не пустой ли массив
		// if (!renderedFilms.length) {
		// 	// если пустой, то выводим сообщение
		// 	setBadSearchResult(nothingFoundMessageText);
		// 	return;
		// } else {
		// 	// если нет, убираем сообщение (на тот случай, если оно было в прошлом рендере)
		// 	setBadSearchResult(null);
		// }
		// обрабатываем поле длительность и сохраняем в стейт
		renderedFilms = handleDuration(renderedFilms);
		setRenderedMovies(renderedFilms);
	}, [
		filteredSavedMovies,
		savedMovies,
		setBadSearchResult,
		setRenderedMovies,
		shortSavedFilmsCheckboxValue,
	]);

	return (
		<main className='saved-movies'>
			<SearchForm />
			{isPreloaderVisible ? (
				<Preloader />
			) : badSearchResult ? (
				<SearchResults />
			) : renderedMovies.length ? (
				<MoviesCardList />
			) : null}
		</main>
	);
}

export default SavedMovies;

import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchResults from '../SearchResults/SearchResults';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { handleDuration, filterByDuration } from '../../utils/utils';

function Movies() {
	const context = React.useContext(CurrentUserContext);
	const {
		movies,
		setMovies,
		renderedMovies,
		setRenderedMovies,
		setMoviesInputValue,
		shortFilmsCheckboxValue,
		setShortFilmsCheckboxValue,
		isPreloaderVisible,
		badSearchResult,
		savedMovies,
	} = context;

	// Функция получения из локального хранилища параметров и
	// результатов предыдущего поиска фильмов текущего пользователя
	const getSavedSearchResults = React.useCallback(() => {
		const savedSearchResult = JSON.parse(localStorage.getItem('movies'));
		const savedSearchText = localStorage.getItem('moviesInputValue');
		const savedСheckboxState = JSON.parse(
			localStorage.getItem('shortFilmsCheckboxValue')
		);
		if (savedSearchResult) {
			setMovies(savedSearchResult);
		}
		if (savedSearchText) {
			setMoviesInputValue(savedSearchText);
		}
		if (savedСheckboxState) {
			setShortFilmsCheckboxValue(savedСheckboxState);
		}
	}, [setMovies, setMoviesInputValue, setShortFilmsCheckboxValue]);

	// Запускаем получение предыдущих результатов поиска из хранилища при монтировании компонента
	React.useEffect(() => {
		getSavedSearchResults();
	}, [getSavedSearchResults]);

	// Готовим массив фильмов для рендеринга - renderedMovies:
	// - фильтруем по чек-боксу короткометражек
	// - преобразуем числовое поле duration в строку вида "__ ч __ м"
	// - добавляем фильмам лайки из сохраненных фильмов
	React.useEffect(() => {
		// если стоит чек-бокс, берем короткометражки
		let renderedFilms;
		if (shortFilmsCheckboxValue) {
			renderedFilms = filterByDuration(movies);
		} else {
			renderedFilms = [...movies];
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
		// добавляем лайки из массива сохраненных фильмов
		renderedFilms = renderedFilms.map((item) => {
			return {
				...item,
				isLiked: savedMovies.some((savedMovie) => {
					return item.movieId === savedMovie.movieId;
				}),
			};
		});
		// обрабатываем поле длительность и сохраняем в стейт
		renderedFilms = handleDuration(renderedFilms);
		setRenderedMovies(renderedFilms);
	}, [movies, savedMovies, setRenderedMovies, shortFilmsCheckboxValue]);

	return (
		<main className='movies'>
			<SearchForm />
			{isPreloaderVisible ? (
				<Preloader />
			) : badSearchResult ? (
				<SearchResults badSearchResult={badSearchResult} />
			) : renderedMovies.length ? (
				<MoviesCardList movies={movies} />
			) : null}
		</main>
	);
}

export default Movies;

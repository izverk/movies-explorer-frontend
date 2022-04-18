import { useState, useEffect, useCallback } from 'react';
import { moviesApiURL } from './constants';

// Обработка и фильтрация массива фильмов с учетом ключевого слова и длительности
export function handleMovies(movies, keyWord, isOnlyShortFilms) {
	// оставляем только короткометражки (если задан соответствующий параметр (чекбокс))
	if (isOnlyShortFilms) {
		movies = filterWithDuration(movies);
	}
	console.log(
		'🚀 ~ file: utils.js ~ line 9 ~ filterMoviesWithDuration ~ movies',
		movies
	);
	// оставляем только фильмы с названиями, содержащими ключевое слово
	movies = filterWithKeyWord(movies, keyWord);
	console.log(
		'🚀 ~ file: utils.js ~ line 13 ~ filterMoviesWithKeyWord ~ movies',
		movies
	);
	// оставляем только нужные поля, преобразуем длительность в строку нужного формата, делаем абсолютные ссылки на изображения вместо относительных
	movies = handleFields(movies);
	console.log('🚀 ~ file: utils.js ~ line 16 ~ handleMovies ~ movies', movies);
	// возвращаем обработанный массив
	return movies;

	// ВЫШЕИСПОЛЬЗОВАННЫЕ ФУНКЦИИ ФИЛЬТРАЦИИ И ОБРАБОТКИ МАССИВОВ
	function filterWithDuration(movies) {
		const durationLimit = 40;
		return movies.filter((movie) => {
			return movie.duration <= durationLimit;
		});
	}

	function filterWithKeyWord(movies, keyWord) {
		return movies.filter((movie) => {
			return movie.nameRU.toLowerCase().includes(keyWord.toLowerCase());
		});
	}

	function handleFields(movies) {
		return movies.map((movie) => {
			const handledDuration =
				Math.trunc(movie.duration / 60) + ' ч ' + (movie.duration % 60) + ' м';
			const handledURL = moviesApiURL + movie.image.url;

			return {
				id: movie.id,
				nameRU: movie.nameRU,
				image: { url: handledURL },
				trailerLink: movie.trailerLink,
				duration: handledDuration,
			};
		});
	}
}

// Закрытие попапов по нажатию Esc
export function useClosePopupByEscape(closePopupHandler) {
	useEffect(() => {
		const closeByEscape = (e) => {
			if (e.key === 'Escape') {
				closePopupHandler();
			}
		};
		document.addEventListener('keydown', closeByEscape);
		return () => document.removeEventListener('keydown', closeByEscape);
	}, [closePopupHandler]);
}

// Закрытие попапа по клику мыши на оверлее или на крестике
export function useClosePopupByMouse(
	isOpen,
	overlayClassName,
	closeButtonClassName,
	closePopupHandler
) {
	useEffect(() => {
		function handleMouseClose(evt) {
			if (
				evt.target.classList.contains(overlayClassName) ||
				evt.target.classList.contains(closeButtonClassName)
			) {
				closePopupHandler();
			}
		}
		if (isOpen) {
			document.addEventListener('mousedown', handleMouseClose);
		} else return;
		return () => {
			document.removeEventListener('mousedown', handleMouseClose);
		};
	}, [isOpen, overlayClassName, closeButtonClassName, closePopupHandler]);
}

// Функция валидации форм
export function useFormValidation() {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [isValid, setIsValid] = useState(false);

	function handleValuesChange(e) {
		const name = e.target.name;

		setValues({ ...values, [name]: e.target.value });
		setErrors({ ...errors, [name]: e.target.validationMessage });
		setIsValid(e.target.closest('form').checkValidity());
	}
	// Функция для для сброса инпутов, сообщений об ошибках ввода и состояния кнопки в попапах,
	// использующих валидацию (мемоизирован во избежание зацикливания ререндеринга)
	const resetValidation = useCallback(
		function ({ values = {}, errors = {}, isValid = false }) {
			setValues(values);
			setErrors(errors);
			setIsValid(isValid);
		},
		[setValues, setErrors, setIsValid]
	);

	return { values, errors, isValid, handleValuesChange, resetValidation };
}

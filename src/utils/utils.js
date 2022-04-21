import { useState, useEffect, useCallback } from 'react';
import { moviesApiURL } from './constants';

// Функция фильтрации фильмов по длительности
export function filterWithDuration(movies) {
	const durationLimit = 40;
	return movies.filter((movie) => {
		return movie.duration <= durationLimit;
	});
}
// Функция фильтрации фильмов по ключевому слову
export function filterWithKeyWord(movies, keyWord) {
	return movies.filter((movie) => {
		return movie.nameRU.toLowerCase().includes(keyWord.toLowerCase());
	});
}
// Функция обработки полей (обрабатываем duration, image.url + оставляем только нужное для отрисовки карточки)
export function handleMoviesFields(movies) {
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

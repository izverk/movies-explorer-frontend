import { useState, useEffect, useCallback } from 'react';
import { moviesApiURL } from './constants';
// import Joi from 'joi';
import {
	NAME_INPUT_ERROR_MESSAGE,
	EMAIL_INPUT_ERROR_MESSAGE,
} from './constants';

// Функция фильтрации фильмов по ключевому слову
export function filterByKeyWord(movies, keyWord) {
	if (keyWord) {
		return movies.filter((movie) => {
			return movie.nameRU.toLowerCase().includes(keyWord.toLowerCase());
		});
	}
}
// Функция фильтрации фильмов по длительности
export function filterByDuration(movies) {
	const durationLimit = 40;
	return movies.filter((movie) => movie.duration <= durationLimit);
}

// Функция формирования и первичной обработки полей объектов исходного массива фильмов
// (оставляем только нужные поля для дальнейшей работы + делаем ссылки абсолютными)
export function handleFields(movies) {
	return movies.map((movie) => {
		return {
			country: movie.country || ' ',
			director: movie.director || ' ',
			duration: movie.duration || 0,
			year: movie.year || ' ',
			description: movie.description || ' ',
			image: moviesApiURL + movie.image.url || ' ',
			trailerLink: movie.trailerLink || ' ',
			thumbnail: moviesApiURL + movie.image.formats.thumbnail.url || ' ',
			movieId: movie.id || -1,
			nameRU: movie.nameRU || ' ',
			nameEN: movie.nameEN || ' ',
		};
	});
}

// Функция обработки поля duration объектов массива фильмов
export function handleDuration(movies) {
	return movies.map((movie) => {
		const handledDuration =
			Math.trunc(movie.duration / 60) + ' ч ' + (movie.duration % 60) + ' м';
		return {
			...movie,
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

// ФУНКЦИЯ ВАЛИДАЦИИ ФОРМ ВВОДА ДАННЫХ
export function useFormValidation() {
	// стейты инпутов, ошибок и влидности
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [isValid, setIsValid] = useState(false);

	// обработчик изменений в инпутах
	function handleValuesChange(e) {
		const name = e.target.name;
		setValues({ ...values, [name]: e.target.value });
		setErrors({
			...errors,
			[name]:
				e.target.validationMessage || validateNameAndEmail(e).errorMessage,
		});
		setIsValid(
			e.target.closest('form').checkValidity() &&
				validateNameAndEmail(e).isValid
		);
	}

	// дополнительный кастомный валидатор для name и email
	function validateNameAndEmail(e) {
		const nameRegExp = /^[ a-zA-Zа-яА-ЯёЁ-]{3,16}$/;
		const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
		if (e.target.name === 'nameInput' && !nameRegExp.test(e.target.value)) {
			return { errorMessage: NAME_INPUT_ERROR_MESSAGE, isValid: false };
		}
		if (e.target.name === 'emailInput' && !emailRegExp.test(e.target.value)) {
			return { errorMessage: EMAIL_INPUT_ERROR_MESSAGE, isValid: false };
		}
		return { errorMessage: undefined, isValid: true };
	}

	// дополнительный валидатор с использованием Joi
	// function validateByJoi(e) {
	// 	const inputs = {
	// 		nameInput: Joi.string()
	// 			.min(3)
	// 			.max(16)
	// 			.pattern(new RegExp('^[a-zA-Zа-яА-ЯёЁ-\\s]{3,16}$'))
	// 			.required(),
	// 		emailInput: Joi.string()
	// 			.email({ tlds: { allow: false } })
	// 			.required(),
	// 		passwordInput: Joi.string().min(6).required(),
	// 	};
	// 	const { error } = inputs[e.target.name].validate(e.target.value);
	// 	let errorMessage;
	// 	if (e.target.name === 'nameInput') {
	// 		errorMessage = NAME_INPUT_ERROR_MESSAGE;
	// 	}
	// 	if (e.target.name === 'emailInput') {
	// 		errorMessage = EMAIL_INPUT_ERROR_MESSAGE;
	// 	}

	// 	if (error) {
	// 		return { errorMessage: errorMessage, isValid: false };
	// 	}
	// 	return { errorMessage: undefined, isValid: true };
	// }

	// функция для для сброса инпутов, сообщений об ошибках ввода и состояния кнопки в попапах,
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

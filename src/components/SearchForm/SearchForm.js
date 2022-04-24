import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { needKeyWordMessageText } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi';
import {
	handleFields,
	filterByDuration,
	filterByKeyWord,
} from '../../utils/utils';
import {
	queryErrorMessageText,
	nothingFoundMessageText,
} from '../../utils/constants';

function SearchForm() {
	const context = React.useContext(CurrentUserContext);
	const {
		initialMovies,
		setInitialMovies,
		setMovies,
		setFilteredSavedMovies,
		moviesInputValue,
		setMoviesInputValue,
		savedMoviesInputValue,
		setSavedMoviesInputValue,
		shortFilmsCheckboxValue,
		setShortFilmsCheckboxValue,
		setIsPreloaderVisible,
		setBadSearchResult,
		savedMovies,
		isFirstSearchHappened,
		setIsFirstSearchHappened,
	} = context;

	// Обработка клика кнопки поиска фильмов (для роута /movies)
	const handleMoviesSearchClick = (e) => {
		e.preventDefault();
		// проверка наличия данных в инпуте
		if (!moviesInputValue) {
			setBadSearchResult(needKeyWordMessageText);
			return;
		}
		setBadSearchResult(null);
		setIsPreloaderVisible(true);
		getAndFilterMovies();

		console.log(
			'🚀 ~ file: SearchForm.js ~ line 50 ~ handleMoviesSearchClick ~ handleMoviesSearchClick',
			'ЗАПУЩЕНА handleMoviesSearchClick'
		);
	};

	// Обработка клика кнопки поиска сохраненных фильмов (для роута /saved-movies)
	const handleSavedMoviesSearchClick = (e) => {
		e.preventDefault();
		// проверка наличия данных в инпуте
		if (!savedMoviesInputValue) {
			// если пусто, обнуляем стейт фильтрованных фильмов (в SavedMovies по нему проводится проверка и если он пустой, выбирается другой - исходный массив сохраненных фильмов для отрисовки)
			setFilteredSavedMovies([]);
			return;
		}
		setBadSearchResult(null);
		filterSavedMovies();
	};

	// Функция получения от стороннего сервиса фильмов и фильтрации (по ключевому слову) для роута /movies
	const getAndFilterMovies = () => {
		// Если запрос первичный, обращаемся к серверу, а если нет, берем ранее уже полученный массив из стейта
		if (isFirstSearchHappened) {
			console.log(
				'🚀 ~ file: SearchForm.js ~ line 156 ~ getAndFilterMovies ~ getAndFilterMovies',
				'ЗАПУЩЕНА getAndFilterMovies блок isFirstSearchHappened тру'
			);
			moviesApi
				.getMovies()
				.then((data) => {
					// формируем и обрабатываем поля объектов исходного массива фильмов
					data = handleFields(data);
					// сохраняем исходный массив в стейт, что бы при последующих запросах не обращаться к серверу
					setInitialMovies(data);
					// сохраняем в стейте факт певрого запроса
					setIsFirstSearchHappened(false);
					// фильтруем по ключевому слову (фильтрация по чек-боксу короткометражек делается уже потом в Movies, что бы разнести логику работы этих фильтров, т.к. чек-бокс включает/выключает фильтрацию каждый раз при изменении своего значения, а инпут - нет. При этом чек-боксом фильтруется именно этот массив, который получен из данного значения инпута и поменяется этот массив только при следующем нажатии кнопки поиска)
					const filteredByKeyWord = filterByKeyWord(data, moviesInputValue);
					// сохраняем в стейт для дальнейшего использования при рендеринге
					setMovies(filteredByKeyWord);
					// если установлен чек-бокс, фильтруем по длительности, что бы понять итоговый результат и принять решение о сохранении поиска
					let finallyFiltered = [];
					if (shortFilmsCheckboxValue) {
						finallyFiltered = filterByDuration(filteredByKeyWord);
					} else {
						finallyFiltered = filteredByKeyWord;
					}
					// при удачном поиске сохраняем его
					if (finallyFiltered.length) {
						localStorage.setItem('movies', JSON.stringify(finallyFiltered));
						localStorage.setItem(
							'shortFilmsCheckboxValue',
							shortFilmsCheckboxValue
						);
						localStorage.setItem('moviesInputValue', moviesInputValue);
						// убираем прелоадер
						setIsPreloaderVisible(false);
					} else {
						// убираем прелоадер
						setIsPreloaderVisible(false);
						// если ничего не найдено просто выводим сообщение, ничего не сохраняя
						setBadSearchResult(nothingFoundMessageText);
						console.log(
							'🚀 ~ file: SearchForm.js ~ line 156 ~ getAndFilterMovies ~ getAndFilterMovies',
							'СРАБОТАЛ блок setBadSearchResult'
						);
					}
				})
				.catch((err) => {
					console.log(err);
					// убираем прелоадер
					setIsPreloaderVisible(false);
					// выводим ошибку получения/обработки данных
					setBadSearchResult(queryErrorMessageText);
				});

			// Если запрос не первичный, берем из стейта уже полученный ранее массив
		} else {
			try {
				// фильтруем по ключевому слову (фильтрация по чек-боксу короткометражек делается уже потом в Movies, что бы разнести логику работы этих фильтров, т.к. чек-бокс включает/выключает фильтрацию каждый раз при изменении своего значения, а инпут - нет. При этом чек-боксом фильтруется именно этот массив, который получен из данного значения инпута и поменяется этот массив только при следующем нажатии кнопки поиска)
				const filteredByKeyWord = filterByKeyWord(
					initialMovies,
					moviesInputValue
				);
				// сохраняем в стейт для дальнейшего использования при рендеринге
				setMovies(filteredByKeyWord);
				// если установлен чек-бокс, фильтруем по длительности, что бы понять итоговый результат и принять решение о сохранении поиска
				let finallyFiltered = [];
				if (shortFilmsCheckboxValue) {
					finallyFiltered = filterByDuration(filteredByKeyWord);
				} else {
					finallyFiltered = filteredByKeyWord;
				}
				// при удачном поиске сохраняем его
				if (finallyFiltered.length) {
					localStorage.setItem('movies', JSON.stringify(finallyFiltered));
					localStorage.setItem(
						'shortFilmsCheckboxValue',
						shortFilmsCheckboxValue
					);
					localStorage.setItem('moviesInputValue', moviesInputValue);
					// убираем прелоадер
					setIsPreloaderVisible(false);
				} else {
					// убираем прелоадер
					setIsPreloaderVisible(false);
					// если ничего не найдено просто выводим сообщение, ничего не сохраняя
					setBadSearchResult(nothingFoundMessageText);
				}
			} catch (err) {
				console.log(err);
				// убираем прелоадер
				setIsPreloaderVisible(false);
				// выводим ошибку получения/обработки данных
				setBadSearchResult(queryErrorMessageText);
			}
		}
	};

	// Функция фильтрации сохраненных фильмов (по ключевому слову) для роута /saved-movies
	const filterSavedMovies = () => {
		// фильтруем по ключевому слову (фильтрация по чек-боксу короткометражек делается уже потом в SavedMovies, что бы разнести логику работы этих фильтров, т.к. чек-бокс включает/выключает фильтрацию каждый раз при изменении своего значения, а инпут - нет. При этом чек-боксом фильтруется именно этот массив, который получен из данного значения инпута и поменяется этот массив только при следующем нажатии кнопки поиска)
		const filteredByKeyWord = filterByKeyWord(
			savedMovies,
			savedMoviesInputValue
		);
		// при удачном поиске сохраняем в стейте
		if (filteredByKeyWord.length) {
			setFilteredSavedMovies(filteredByKeyWord);
		} else {
			// если ничего не найдено просто выводим сообщение, ничего не сохраняя
			setBadSearchResult(nothingFoundMessageText);
		}
	};

	const handleMoviesInputChange = (e) => {
		setMoviesInputValue(e.target.value);
	};

	const handleSavedMoviesInputChange = (e) => {
		setSavedMoviesInputValue(e.target.value);
	};

	return (
		<Switch>
			<Route path='/movies'>
				<form
					className='search-form'
					noValidate
					onSubmit={handleMoviesSearchClick}
					name='movies-search-form'>
					<div className='search-form__container'>
						<div className='search-form__input-row'>
							<input
								className='search-form__input'
								type='text'
								name='movie'
								id='movie-input'
								placeholder='Фильм'
								onChange={handleMoviesInputChange}
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
			</Route>
			<Route path='/saved-movies'>
				<form
					className='search-form'
					noValidate
					onSubmit={handleSavedMoviesSearchClick}
					name='movies-search-form'>
					<div className='search-form__container'>
						<div className='search-form__input-row'>
							<input
								className='search-form__input'
								type='text'
								name='movie'
								id='movie-input'
								placeholder='Фильм'
								onChange={handleSavedMoviesInputChange}
								value={savedMoviesInputValue || ''}
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
			</Route>
		</Switch>
	);
}

export default SearchForm;

// // Функция получения от стороннего сервиса фильмов и фильтрации (по ключевому слову) для роута /movies
// 	const getAndFilterMovies = () => {
// 		moviesApi
// 			.getMovies()
// 			.then((data) => {
// 				// формируем и обрабатываем поля объектов исходного массива фильмов
// 				data = handleFields(data);
// 				// фильтруем по ключевому слову (фильтрация по чек-боксу короткометражек делается уже потом в Movies, что бы разнести логику работы этих фильтров, т.к. чек-бокс включает/выключает фильтрацию каждый раз при изменении своего значения, а инпут - нет. При этом чек-боксом фильтруется именно этот массив, который получен из данного значения инпута и поменяется этот массив только при следующем нажатии кнопки поиска)
// 				const filteredByKeyWord = filterByKeyWord(data, moviesInputValue);
// 				// сохраняем в стейт для дальнейшего использования при рендеринге
// 				setMovies(filteredByKeyWord);
// 				// если установлен чек-бокс, фильтруем по длительности, что бы понять итоговый результат и принять решение о сохранении поиска
// 				let finallyFiltered = [];
// 				if (shortFilmsCheckboxValue) {
// 					finallyFiltered = filterByDuration(filteredByKeyWord);
// 				} else {
// 					finallyFiltered = filteredByKeyWord;
// 				}
// 				// при удачном поиске сохраняем его
// 				if (finallyFiltered.length) {
// 					localStorage.setItem('movies', JSON.stringify(finallyFiltered));
// 					localStorage.setItem(
// 						'shortFilmsCheckboxValue',
// 						shortFilmsCheckboxValue
// 					);
// 					localStorage.setItem('moviesInputValue', moviesInputValue);
// 					// убираем прелоадер
// 					setIsPreloaderVisible(false);
// 				} else {
// 					// убираем прелоадер
// 					setIsPreloaderVisible(false);
// 					// если ничего не найдено просто выводим сообщение, ничего не сохраняя
// 					setBadSearchResult(nothingFoundMessageText);
// 				}
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				// убираем прелоадер
// 				setIsPreloaderVisible(false);
// 				// выводим ошибку получения/обработки данных
// 				setBadSearchResult(queryErrorMessageText);
// 			});
// 	};

import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Page404 from '../Page404/Page404';
import ModalMenu from '../ModalMenu/ModalMenu';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
<<<<<<< HEAD
import { filterWithKeyWord, handleUrlAndDuration } from '../../utils/utils';
=======
import { filterWithKeyWord, handleMoviesFields } from '../../utils/utils';
>>>>>>> b2384b9d64a9668cb1099cc6fef1a488c1ed2704
import {
	queryErrorMessageText,
	nothingFoundMessageText,
	formSubmitErrorText,
} from '../../utils/constants';

function App() {
	const history = useHistory();

	// Стейт модального меню навигации
	const [modalMenuState, setModalMenuState] = React.useState(false);
	const changeModalMenuState = () => {
		setModalMenuState((modalMenuState) => !modalMenuState);
	};

	// =================== ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ - РЕГИСТРАЦИЯ, АВТОРИЗАЦИЯ, ЗАГРУЗКА КОНТЕНТА ===================

	// Стейт с данными текущего пользователя
	const [currentUser, setCurrentUser] = React.useState({});
	// Стейт авторизованности пользователя
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	// Стейт сообщения с ошибкой отправки формы ввода данных
	const [formSubmitError, setFormSubmitError] = React.useState('');

	// Функция регистрации пользователя
	function registerUser({ name, email, password }) {
		mainApi
			.register(name, email, password)
			.then((userData) => {
				loginUser({ email, password });
			})
			.catch((err) => {
				console.log('🚀 ~ file: Register.js ~ line 35 ~ .then ~ err', err);
				// выводим ошибку отправки данных в компоненте AuthForm
				setFormSubmitError(formSubmitErrorText);
			});
	}

	// Функция авторизации пользователя
	function loginUser({ email, password }) {
		mainApi
			.login(email, password)
			.then(({ token }) => {
				if (token) {
					localStorage.setItem('token', token);
					mainApi.setTokenHeaders(token);
					checkTokenAndLoadContent();
				} else {
					return;
				}
			})
			.catch((err) => {
				console.log(err);
				// выводим ошибку отправки данных в компоненте AuthForm
				setFormSubmitError(formSubmitErrorText);
			});
	}

	// Функция проверки наличия токена и запуска загрузки контента текущего пользователя (ранее сохраненных данных поиска фильмов)
	const checkTokenAndLoadContent = React.useCallback(() => {
		const token = localStorage.getItem('token');
		if (token) {
			mainApi
				.checkToken(token)
				.then((userData) => {
					// setCurrentUser((prevState) => {
					// 	return { ...prevState, _id: userData._id, email: userData.email };
					// });
					setCurrentUser({
						name: userData.name,
						_id: userData._id,
						email: userData.email,
					});
					setIsLoggedIn(true);
					mainApi.setTokenHeaders(token);
					history.push('/movies');
					getCurrentUserContent();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [history]);

	// Проверяем наличие токена в хранилще и загружаем контент текущего пользователя
	React.useEffect(() => {
		checkTokenAndLoadContent();
	}, [checkTokenAndLoadContent]);

	// Функция загрузки контента текущего пользователя (ранее сохраненных данных поиска фильмов)
	function getCurrentUserContent() {
		const savedMovies = JSON.parse(localStorage.getItem('movies'));
		const savedSearchText = localStorage.getItem('moviesInputValue');
		const savedСheckboxState = JSON.parse(
			localStorage.getItem('shortFilmsCheckboxValue')
		);
		if (savedMovies) {
			setMovies(savedMovies);
		}
		if (savedSearchText) {
			setMoviesInputValue(savedSearchText);
		}
		if (savedСheckboxState) {
			setShortFilmsCheckboxValue(savedСheckboxState);
		}
	}

	// =================== ЛОГИКА РАБОТЫ С КАРТОЧКАМИ ФИЛЬМОВ ===================

	// Стейт с исходным массивом фильмов со стороннего сервиса
<<<<<<< HEAD
	const [initialMovies, setInitialMovies] = React.useState([]);
	console.log(
		'🚀 ~ file: App.js ~ line 129 ~ App ~ initialMovies',
		initialMovies
	);
	// Стейт с массивом фильмов, найденных по ключевому слову (и обработанных)
	const [movies, setMovies] = React.useState([]);
	console.log('🚀 ~ file: App.js ~ line 131 ~ App ~ movies', movies);
	// Стейт с массивом фильмов, дополнительно отфильтрованных по длительности
	const [shortMovies, setShortMovies] = React.useState([]);
	console.log('🚀 ~ file: App.js ~ line 133 ~ App ~ shortMovies', shortMovies);
	// Стейт с массивом фильмов, передаваемый для отрисовки в MoviesCardList
	const [renderedMovies, setRenderedMovies] = React.useState([]);
=======
	const [initialMovies, setInitialMovies] = React.useState(null);
	// Стейт с массивом фильмов, найденных по ключевому слову (и обработанных)
	const [movies, setMovies] = React.useState(null);
	console.log('🚀 ~ file: App.js ~ line 131 ~ App ~ movies', movies);
	// Стейт с массивом фильмов, дополнительно отфильтрованных по длительности
	const [shortMovies, setShortMovies] = React.useState(null);
	console.log('🚀 ~ file: App.js ~ line 133 ~ App ~ shortMovies', shortMovies);
	// Стейт с массивом фильмов, передаваемый для отрисовки в MoviesCardList
	const [renderedMovies, setRenderedMovies] = React.useState(movies);
>>>>>>> b2384b9d64a9668cb1099cc6fef1a488c1ed2704
	console.log(
		'🚀 ~ file: App.js ~ line 135 ~ App ~ renderedMovies',
		renderedMovies
	);
	// Стейт с массивом сохраненных фильмов
	const [savedMovies, setSavedMovies] = React.useState(null);
	// Стейт со значением инпута формы поиска фильмов
	const [moviesInputValue, setMoviesInputValue] = React.useState('');
	// Стейт со значением чек-бокса короткометражек
	const [shortFilmsCheckboxValue, setShortFilmsCheckboxValue] =
		React.useState(false);
	console.log(
		'🚀 ~ file: App.js ~ line 147 ~ App ~ shortFilmsCheckboxValue',
		shortFilmsCheckboxValue
	);
	// Стейт прелоадера для его отрисовки в момент загрузки фильмов
	const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
	// Стейт сообщения с результатом поиска фильмов
	const [badSearchResult, setBadSearchResult] = React.useState('');

	// Функция получения и фильтрации фильмов
	//  по нажатию кнопки поиска в SearchForm
	const getAndFilterMovies = () => {
		moviesApi
			.getMovies()
			.then((initialMovies) => {
				// сохраняем в стейт исходный массив фильмов
				setInitialMovies(initialMovies);
				// фильтруем фильмы по ключевому слову
<<<<<<< HEAD
				const filteredMovies = filterWithKeyWord(
					initialMovies,
					moviesInputValue
=======
				const filteredWithKeyWord = filterWithKeyWord(
					initialMovies,
					moviesInputValue
				);
				// обрабатываем поля duration, image.url
				const handledMovies = handleMoviesFields(filteredWithKeyWord);
				console.log(
					'🚀 ~ file: App.js ~ line 101 ~ .then ~ handledMovies',
					handledMovies
>>>>>>> b2384b9d64a9668cb1099cc6fef1a488c1ed2704
				);

				// // обрабатываем поля duration, image.url
				// const handledMovies = handleUrlAndDuration(filteredWithKeyWord);
				// console.log(
				// 	'🚀 ~ file: App.js ~ line 101 ~ .then ~ handledMovies',
				// 	handledMovies
				// );

				// убираем прелоадер
				setIsPreloaderVisible(false);
				// при удачном поиске сохраняем его в локальном хранилище и в стейте
				if (filteredMovies.length > 0) {
					setMovies(filteredMovies);
					localStorage.setItem('movies', JSON.stringify(filteredMovies));
					localStorage.setItem(
						'shortFilmsCheckboxValue',
						JSON.stringify(shortFilmsCheckboxValue)
					);
					localStorage.setItem('moviesInputValue', moviesInputValue);
				} else {
					// если ничего не найдено просто выводим сообщение, ничего не сохраняя
					setBadSearchResult(nothingFoundMessageText);
				}
			})
			.catch((err) => {
				console.log(err);
				// убираем прелоадер
				setIsPreloaderVisible(false);
				// выводим ошибку получения/обработки данных
				setBadSearchResult(queryErrorMessageText);
			});
	};
<<<<<<< HEAD
	// Выбираем массив фильмов для отображения в зависимости от
	// чек-бокса короткометражек, готовим его к отрисовке
	// (обрабатываем поля image.url и duration) и сохраняем в стейт
	React.useEffect(() => {
		let renderedFilms;
		if (shortFilmsCheckboxValue) {
			renderedFilms = shortMovies;
		} else {
			renderedFilms = movies;
		}
		setRenderedMovies(handleUrlAndDuration(renderedFilms));
=======

	// Выбираем массив фильмов для отображения в зависимости от чек-бокса короткометражек
	React.useEffect(() => {
		if (shortFilmsCheckboxValue) {
			setRenderedMovies(shortMovies);
		} else {
			setRenderedMovies(movies);
		}
>>>>>>> b2384b9d64a9668cb1099cc6fef1a488c1ed2704
	}, [movies, shortMovies, shortFilmsCheckboxValue, setRenderedMovies]);

	return (
		<CurrentUserContext.Provider
			value={{
				modalMenuState,
				setModalMenuState,
				currentUser,
				setCurrentUser,
				isLoggedIn,
				setIsLoggedIn,
				formSubmitError,
				setFormSubmitError,
				initialMovies,
				setInitialMovies,
				movies,
				setMovies,
				shortMovies,
				setShortMovies,
				renderedMovies,
				setRenderedMovies,
				moviesInputValue,
				setMoviesInputValue,
				shortFilmsCheckboxValue,
				setShortFilmsCheckboxValue,
				isPreloaderVisible,
				setIsPreloaderVisible,
				badSearchResult,
				setBadSearchResult,
				savedMovies,
				setSavedMovies,
			}}>
			<div className='app'>
				<Switch>
					<Route exact path='/signin'>
						{/* защита от возврата на экран авторизации */}
						{() =>
							isLoggedIn ? (
								<Redirect to='/movies' />
							) : (
								<Login
									loginUser={loginUser}
									formSubmitError={formSubmitError}
									setFormSubmitError={setFormSubmitError}
								/>
							)
						}
					</Route>

					<Route exact path='/signup'>
						{/* защита от возврата на экран регистрации */}
						{() =>
							isLoggedIn ? (
								<Redirect to='/movies' />
							) : (
								<Register
									registerUser={registerUser}
									formSubmitError={formSubmitError}
									setFormSubmitError={setFormSubmitError}
								/>
							)
						}
					</Route>

					<Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
						<Header
							isLoggedIn={isLoggedIn}
							openModalMenu={changeModalMenuState}
						/>

						<Switch>
							<Route exact path='/'>
								<Main />
							</Route>

							<Route path='/movies'>
								{/* защита маршрута */}
								{() =>
									!isLoggedIn ? (
										<Redirect to='/' />
									) : (
										<Movies
											movies={movies}
											isPreloaderVisible={isPreloaderVisible}
											setIsPreloaderVisible={setIsPreloaderVisible}
											moviesInputValue={moviesInputValue}
											setMoviesInputValue={setMoviesInputValue}
											shortFilmsCheckboxValue={shortFilmsCheckboxValue}
											setShortFilmsCheckboxValue={setShortFilmsCheckboxValue}
											getAndFilterMovies={getAndFilterMovies}
											badSearchResult={badSearchResult}
											setBadSearchResult={setBadSearchResult}
										/>
									)
								}
							</Route>
							<Route path='/saved-movies'>
								{/* защита маршрута */}
								{() =>
									!isLoggedIn ? (
										<Redirect to='/' />
									) : (
										<SavedMovies savedMovies={savedMovies} />
									)
								}
							</Route>
							<Route path='/profile'>
								{/* защита маршрута */}
								{() =>
									!isLoggedIn ? (
										<Redirect to='/' />
									) : (
										<Profile
										// isLoggedIn={isLoggedIn}
										// setIsLoggedIn={setIsLoggedIn}
										/>
									)
								}
							</Route>
						</Switch>

						<Route exact path={['/', '/movies', '/saved-movies']}>
							<Footer />
						</Route>
					</Route>

					<Route path='*'>
						<Page404 />
					</Route>
				</Switch>
				<ModalMenu
					modalMenuState={modalMenuState}
					closeModalMenu={changeModalMenuState}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;

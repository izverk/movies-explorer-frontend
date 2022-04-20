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
import { handleMovies } from '../../utils/utils';
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

	// =================== ПОИСК ФИЛЬМОВ в стороннем сервисе ===================

	// Стейт с массивом запрошенных фильмов
	const [movies, setMovies] = React.useState(null);
	// Стейт со значением инпута поиска фильмов
	const [moviesInputValue, setMoviesInputValue] = React.useState('');
	// Стейт со значением чек-бокса фильтра короткометражек
	const [shortFilmsCheckboxValue, setShortFilmsCheckboxValue] =
		React.useState(false);
	// Стейт прелоадера для его отрисовки в момент загрузки фильмов
	const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
	// Стейт сообщения с результатом поиска фильмов
	const [badSearchResult, setBadSearchResult] = React.useState('');

	// Функция получения и фильтрации фильмов
	//  по нажатию кнопки поиска в SearchForm
	const getAndFilterMovies = () => {
		moviesApi
			.getMovies()
			.then((movies) => {
				// фильтруем массив фильмов в соответствии с
				//  параметрами формы поиска и обрабатываем поля
				const handledMovies = handleMovies(
					movies,
					moviesInputValue,
					shortFilmsCheckboxValue
				);
				console.log(
					'🚀 ~ file: App.js ~ line 101 ~ .then ~ handledMovies',
					handledMovies
				);
				// убираем прелоадер
				setIsPreloaderVisible(false);
				// при удачном поиске сохраняем его в локальном хранилище и в стейте
				if (handledMovies.length > 0) {
					setMovies(handledMovies);
					localStorage.setItem('movies', JSON.stringify(handledMovies));
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

	// ================ СОХРАНЕННЫЕ ФИЛЬМЫ ПОЛЬЗОВАТЕЛЯ ============================

	// Стейт с массивом сохраненных фильмов
	const [savedMovies, setSavedMovies] = React.useState(null);

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
				movies,
				setMovies,
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

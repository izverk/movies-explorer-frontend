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
import {
	handleFields,
	handleDuration,
	filterWithKeyWord,
} from '../../utils/utils';
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
	const [formSubmitError, setFormSubmitError] = React.useState(null);

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

	// Функция проверки наличия токена и запуска загрузки его контента
	// (ранее сохраненных фильмов, параметров и результатов поиска фильмов)
	const checkTokenAndLoadContent = React.useCallback(() => {
		const token = localStorage.getItem('token');
		if (token) {
			// запрашиваем у сервера проверку токена
			mainApi
				.checkToken(token)
				.then((userData) => {
					// сохраняем юзера в стейт
					setCurrentUser({
						name: userData.name,
						_id: userData._id,
						email: userData.email,
					});
					setIsLoggedIn(true);
					// устанавливаем токен в заголовки запросов
					mainApi.setTokenHeaders(token);
					// достаем результаты поиска из хранилища
					getSavedSearchResults();
				})
				.then(() => {
					// запрашиваем у сервера сохраненные фильмы
					// текущего пользователя
					mainApi
						.getCards()
						.then((data) => {
							// добавляем их в стейт
							setSavedMovies(data);
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.then(() => {
					history.push('/movies');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [history]);

	// Запускаем проверку токена и загрузку контента текущего пользователя
	React.useEffect(() => {
		checkTokenAndLoadContent();
	}, [checkTokenAndLoadContent]);

	// // Згружаем исходный массив фильмов
	// React.useEffect(() => {
	// 	moviesApi
	// 		.getMovies()
	// 		.then((data) => {
	// 			console.log('🚀 ~ file: App.js ~ line 113 ~ .then ~ data', data);
	// 			// формируем и обрабатываем поля объектов
	// 			data = handleFields(data);
	// 			console.log('🚀 ~ file: App.js ~ line 116 ~ .then ~ data', data);
	// 			setInitialMovies(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	// Функция загрузки контента текущего пользователя (ранее
	//  сохраненных фильмов, параметров и результатов поиска фильмов)
	function getSavedSearchResults() {
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

	// // Загружаем сохраненные фильмы при монтировании компонента
	// React.useEffect(() => {
	// 	mainApi
	// 		.getCards()
	// 		.then((data) => {
	// 			setSavedMovies(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, [setSavedMovies]);

	// =================== ЛОГИКА РАБОТЫ С КАРТОЧКАМИ ФИЛЬМОВ ===================

	// Стейт с исходным массивом фильмов со стороннего сервиса
	const [initialMovies, setInitialMovies] = React.useState([]);
	// Стейт с массивом фильмов, найденных по ключевому слову (и обработанных, оставлены только нужные для отрисовки поля)
	const [movies, setMovies] = React.useState([]);
	// Стейт с массивом фильмов, дополнительно отфильтрованных по длительности
	const [shortMovies, setShortMovies] = React.useState([]);
	// Стейт с массивом фильмов, передаваемый для отрисовки в MoviesCardList (здесь уже дополнительно обработаны два поля - duration и image.url)
	const [renderedMovies, setRenderedMovies] = React.useState([]);
	// Стейт с массивом сохраненных фильмов
	const [savedMovies, setSavedMovies] = React.useState([]);
	// Стейт со значением инпута формы поиска фильмов
	const [moviesInputValue, setMoviesInputValue] = React.useState('');
	// Стейт со значением чек-бокса короткометражек
	const [shortFilmsCheckboxValue, setShortFilmsCheckboxValue] =
		React.useState(false);
	// Стейт прелоадера для его отрисовки в момент загрузки фильмов
	const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
	// Стейт сообщения с результатом поиска фильмов (потом сюда попадает строка, стейт используется и для условного рендеринга компонентов, и для отображения самого текста сообщения)
	const [badSearchResult, setBadSearchResult] = React.useState(null);

	// Функция получения и фильтрации фильмов
	//  по нажатию кнопки поиска в SearchForm
	const getAndFilterMovies = () => {
		moviesApi
			.getMovies()
			.then((data) => {
				console.log('🚀 ~ file: App.js ~ line 170 ~ .then ~ data', data);
				// формируем и обрабатываем поля объектов исходного массива фильмов
				data = handleFields(data);
				console.log('🚀 ~ file: App.js ~ line 173 ~ .then ~ data', data);
				// сохраняем в стейт
				setInitialMovies(data);
				// фильтруем фильмы по ключевому слову
				const filteredMovies = filterWithKeyWord(data, moviesInputValue);
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

	// Готовим массив фильмов для отображения в зависимости от
	// чек-бокса короткометражек:
	// - преобразуем числовое поле duration в строку вида "__ ч __ м"
	// - добавляем фмльмам лайки из сохраненных фильмов
	React.useEffect(() => {
		// если стоит чек-бокс, берем короткометражки
		let renderedFilms;
		if (shortFilmsCheckboxValue) {
			renderedFilms = [...shortMovies];
		} else {
			renderedFilms = [...movies];
		}
		// добавляем лайки из массива сохраненных фильмов
		renderedFilms = renderedFilms.map((item) => {
			return {
				...item,
				isLiked: savedMovies.some((savedMovie) => {
					return item.movieId === savedMovie.movieId;
				}),
			};
		});
		// обрабатываем поле длительность и сохр в стейт
		renderedFilms = handleDuration(renderedFilms);
		setRenderedMovies(renderedFilms);
		console.log(
			'🚀 ~ file: App.js ~ line 225 ~ React.useEffect ~ renderedFilms',
			renderedFilms
		);
	}, [
		movies,
		shortMovies,
		savedMovies,
		shortFilmsCheckboxValue,
		setRenderedMovies,
	]);

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

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
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { formSubmitErrorText } from '../../utils/constants';

function App() {
	const history = useHistory();

	// Стейт модального меню навигации
	const [modalMenuState, setModalMenuState] = React.useState(false);
	const changeModalMenuState = () => {
		setModalMenuState((modalMenuState) => !modalMenuState);
	};

	// =================== ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ - РЕГИСТРАЦИЯ, АВТОРИЗАЦИЯ, ЗАГРУЗКА ФИЛЬМОВ из БД ===================

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

	// Функция проверки токена и загрузки контента
	// текущего пользователя (сохраненных фильмов из БД)
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
				})
				.then(() => {
					// запрашиваем у сервера сохраненные фильмы текущего пользователя
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
					// редиректим авторизовавшегося пользователя на страницу фильмов
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

	// =================== Стейты для работы С КАРТОЧКАМИ ФИЛЬМОВ ===================

	// Стейт с массивом найденных фильмов по ключевому слову
	const [movies, setMovies] = React.useState([]);
	// Стейт с массивом фильмов, передаваемый для отрисовки в MoviesCardList (в нем уже сделан выбор между полным списком и короткометражками, а также преобразовано поле - duration). Для страниц /movies и /saved-movies это разные списки.
	const [renderedMovies, setRenderedMovies] = React.useState([]);
	// Стейт с массивом сохраненных фильмов
	const [savedMovies, setSavedMovies] = React.useState([]);
	// Стейт  с массивом сохраненных фильмов отфильтрованных по ключевому слову (в SavedMovies по нему проводится проверка и если он пустой, выбирается другой - исходный массив сохраненных фильмов для отрисовки))
	const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
	// Стейт со значением инпута формы поиска фильмов
	const [moviesInputValue, setMoviesInputValue] = React.useState('');
	// Стейт со значением инпута формы поиска сохраненных фильмов
	const [savedMoviesInputValue, setSavedMoviesInputValue] = React.useState('');
	// Стейт со значением чек-бокса короткометражек
	const [shortFilmsCheckboxValue, setShortFilmsCheckboxValue] =
		React.useState(false);
	// Стейт со значением чек-бокса короткометражек сохраненных фильмов
	const [shortSavedFilmsCheckboxValue, setShortSavedFilmsCheckboxValue] =
		React.useState(false);
	// Стейт прелоадера для его отрисовки в момент загрузки фильмов
	const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
	// Стейт сообщения с результатом поиска фильмов (потом сюда попадает строка, стейт используется и для условного рендеринга компонентов, и для отображения самого текста сообщения)
	const [badSearchResult, setBadSearchResult] = React.useState(null);

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
				savedMovies,
				setSavedMovies,
				filteredSavedMovies,
				setFilteredSavedMovies,
				renderedMovies,
				setRenderedMovies,
				moviesInputValue,
				setMoviesInputValue,
				savedMoviesInputValue,
				setSavedMoviesInputValue,
				shortFilmsCheckboxValue,
				setShortFilmsCheckboxValue,
				shortSavedFilmsCheckboxValue,
				setShortSavedFilmsCheckboxValue,
				isPreloaderVisible,
				setIsPreloaderVisible,
				badSearchResult,
				setBadSearchResult,
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
								{() => (!isLoggedIn ? <Redirect to='/' /> : <Movies />)}
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

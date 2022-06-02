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
import { formSubmitErrorText, PAGES_WITHOUT_AUT } from '../../utils/constants';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function App(props) {
	const history = useHistory();
	const location = useLocation();

	// Стейт модального меню навигации
	const [modalMenuState, setModalMenuState] = React.useState(false);
	const changeModalMenuState = () => {
		setModalMenuState((modalMenuState) => !modalMenuState);
	};

	// =================== ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ - РЕГИСТРАЦИЯ, АВТОРИЗАЦИЯ, ЗАГРУЗКА ФИЛЬМОВ из БД ===================

	// Стейт с данными текущего пользователя
	const [currentUser, setCurrentUser] = React.useState({});

	// Стейт авторизованности пользователя
	const [isLoggedIn, setIsLoggedIn] = React.useState(
		localStorage.getItem('token') ? true : false
	);

	// Стейт сообщения об ошибке отправки формы ввода регистрационных данных
	const [formSubmitError, setFormSubmitError] = React.useState(null);

	// Функция регистрации пользователя
	function registerUser({ name, email, password }) {
		mainApi
			.register(name, email, password)
			.then((userData) => {
				loginUser({ email, password });
			})
			.catch((err) => {
				console.log(err);
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
						// .then(() => {
						// 	// // редиректим авторизовавшегося пользователя на страницу фильмов
						// 	history.push('/movies');
						// })
						// редирект делается ниже в useEffect
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	// Запускаем проверку токена и загрузку контента текущего пользователя
	React.useEffect(() => {
		checkTokenAndLoadContent();
	}, [checkTokenAndLoadContent]);

	// Обеспечиваем редирект после логина на страницу /movies со страниц авторизации или регистрации
	React.useEffect(() => {
		if (isLoggedIn && PAGES_WITHOUT_AUT.includes(location.pathname)) {
			history.push('/movies');
		}
	}, [isLoggedIn, history, location.pathname]);

	// =================== Стейты для работы С КАРТОЧКАМИ ФИЛЬМОВ ===================

	// Стейт с массивом исходных фильмов со стороннего сервиса
	const [initialMovies, setInitialMovies] = React.useState([]);
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
	// Стейт, отражающий факт того, что текущим пользователем запущен первый запрос фильмов (очищается при выходе из аккаунта, так же как и стейты isLoggedIn, currentUser и результаты поиска фильмов в локальном хранилище)
	const [isFirstSearchHappened, setIsFirstSearchHappened] =
		React.useState(false);

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
				isFirstSearchHappened,
				setIsFirstSearchHappened,
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
								{() => (!isLoggedIn ? <Redirect to='/' /> : <Profile />)}
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

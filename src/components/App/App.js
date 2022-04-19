import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi';
import { handleMovies } from '../../utils/utils';
import {
	queryErrorMessageText,
	nothingFoundMessageText,
} from '../../utils/constants';

function App() {
	// Стейт с данными текущего пользователя
	const [currentUser, setCurrentUser] = useState({});
	// Стейт авторизованности пользователя
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// Стейт модального меню навигации
	const [modalMenuState, setModalMenuState] = useState(false);
	const changeModalMenuState = () => {
		setModalMenuState((modalMenuState) => !modalMenuState);
	};
	// Стейт сообщения с ошибкой регистрации
	const [regSubmitError, setRegSubmitError] = React.useState('');

	// =========================== РАБОТА С ФИЛЬМАМИ. КОМПОНЕНТ Movies ==============================

	// Стейт с массивом запрошенных фильмов
	const [movies, setMovies] = React.useState(null);
	// Стейт со значением инпута поиска фильмов
	const [moviesInputValue, setMoviesInputValue] = React.useState('');
	// Стейт со значением чек-бокса фильтра короткометражек
	const [shortFilmsCheckboxValue, setShortFilmsCheckboxValue] =
		React.useState(false);
	// Стейт прелоадера для его отрисовки в момент загрузки фильмов
	const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
	// Стейт сообщения с результатом поиска фильмов
	const [badSearchResult, setBadSearchResult] = React.useState('');

	// При монтировании компонента достаём из локального хранилища ранее
	// сохраненные параметры и результаты поиска фильмов (при наличии)
	React.useEffect(() => {
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
	}, []);

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
					setBadSearchResult(() => nothingFoundMessageText);
				}
			})
			.catch((err) => {
				console.log(err);
				// убираем прелоадер
				setIsPreloaderVisible(false);
				// выводим ошибку получения/обработки данных
				setBadSearchResult(() => queryErrorMessageText);
			});
	};

	// ============================ РАБОТА С ФИЛЬМАМИ. КОМПОНЕНТ SavedMovies ============================
	const [savedMovies, setSavedMovies] = React.useState(null);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className='app'>
				<Switch>
					<Route exact path='/signin'>
						<Login />
					</Route>

					<Route exact path='/signup'>
						<Register
							regSubmitError={regSubmitError}
							setRegSubmitError={setRegSubmitError}
						/>
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
							</Route>
							<Route path='/saved-movies'>
								<SavedMovies savedMovies={savedMovies} />
							</Route>
							<Route path='/profile'>
								<Profile
									isLoggedIn={isLoggedIn}
									setIsLoggedIn={setIsLoggedIn}
								/>
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

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
import {
	queryErrorMessageText,
	nothingFoundMessageText,
} from '../../utils/constants';

function App() {
	// Стейт с данными текущего пользователя
	const [currentUser, setCurrentUser] = useState({});

	// Стейт авторизованности пользователя
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	// Стейт для отрисовки прелоадера в момент загрузки фильмов
	const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);

	// Стейт модального меню навигации
	const [modalMenuState, setModalMenuState] = useState(false);
	const changeModalMenuState = () => {
		setModalMenuState((modalMenuState) => !modalMenuState);
	};

	// ================== ЛОГИКА ПОЛУЧЕНИЯ/СОХРАНЕНИЯ/ФИЛЬТРАЦИИ ФИЛЬМОВ====================

	// Стейт с массивом фильмов для отрисовки
	const [movies, setMovies] = React.useState(null);

	// Стейт со значением инпута поиска фильмов
	const [moviesSearchInputText, setMoviesSearchInputText] = React.useState('');

	// Стейт со значением чек-бокса фильтра короткометражек
	const [moviesSearchCheckboxState, setMoviesSearchCheckboxState] =
		React.useState(false);

	// Стейт вывода в модальном окне ResultInfoModal результатов различных действий пользователя
	const [infoModal, setInfoModal] = React.useState({
		isModalOpen: false,
		isSucces: false,
		message: 'Начальное тестовое сообщение!',
	});

	// Стейт сообщения с результатом поиска фильмов
	const [badSearchResult, setBadSearchResult] = React.useState('');

	// Достаём из локального хранилища ранее сохраненные параметры и результаты поиска фильмов (при наличии)
	React.useEffect(() => {
		const savedMovies = JSON.parse(localStorage.getItem('movies'));
		const savedSearchText = localStorage.getItem('moviesSearchInputText');
		const savedСheckboxState = JSON.parse(
			localStorage.getItem('moviesSearchCheckboxState')
		);
		if (savedMovies) {
			setMovies(savedMovies);
		}
		if (savedSearchText) {
			setMoviesSearchInputText(savedSearchText);
		}
		if (savedСheckboxState) {
			setMoviesSearchCheckboxState(savedСheckboxState);
		}
	}, []);

	// // для отладки
	// React.useEffect(() => {
	// 	console.log(
	// 		'🚀 ~ file: App.js ~ line 68 ~ React.useEffect ~ movies',
	// 		movies
	// 	);
	// 	console.log(
	// 		'🚀 ~ file: App.js ~ line 45 ~ App ~ moviesSearchCheckboxState',
	// 		moviesSearchCheckboxState
	// 	);
	// });

	// Функция получения и фильтрации фильмов по нажатию кнопки поиска в SearchForm
	const getAndFilterMovies = () => {
		moviesApi
			.getMovies()
			.then((movies) => {
				// Фильтрация полученного массива фильмов в соответствии с параметрами формы поиска

				// Сохранение параметров и результатов поиска в локальном хранилище при удачном поиске

				localStorage.setItem('movies', JSON.stringify(movies));
				localStorage.setItem(
					'moviesSearchCheckboxState',
					JSON.stringify(moviesSearchCheckboxState)
				);
				localStorage.setItem('moviesSearchInputText', moviesSearchInputText);

				// Cохраняем отфильтрованные фильмы в стейт-переменную
				// setMovies(movies);

				// Убираем прелоадер
				setIsPreloaderVisible(false);
				// Cитуация, когда ничего не найдено
				setBadSearchResult(() => nothingFoundMessageText);
			})
			.catch((err) => {
				console.log(err);
				// setInfoModal({
				// 	isModalOpen: true,
				// 	isSucces: false,
				// 	message: queryErrorMessage,
				// });
				// Убираем прелоадер
				setIsPreloaderVisible(false);
				// Ситуация, когда в процессе получения и обработки данных происходит ошибка
				setBadSearchResult(() => queryErrorMessageText);
			});
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className='app'>
				<Switch>
					<Route exact path='/signin'>
						<Login />
					</Route>

					<Route exact path='/signup'>
						<Register />
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
									moviesSearchInputText={moviesSearchInputText}
									setMoviesSearchInputText={setMoviesSearchInputText}
									moviesSearchCheckboxState={moviesSearchCheckboxState}
									setMoviesSearchCheckboxState={setMoviesSearchCheckboxState}
									getAndFilterMovies={getAndFilterMovies}
									badSearchResult={badSearchResult}
									setBadSearchResult={setBadSearchResult}
								/>
							</Route>
							<Route path='/saved-movies'>
								<SavedMovies />
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

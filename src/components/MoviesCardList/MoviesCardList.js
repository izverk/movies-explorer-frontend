import React from 'react';
import { Route } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCardList() {
	const context = React.useContext(CurrentUserContext);
	const { renderedMovies } = context;

	// Стейт кнопки "Ещё"
	const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(true);

	// Стейт количества карточек для отрисовки
	const [renderedCardsAmount, setRenderedCardsAmount] = React.useState(null);

	// Стейт фиксированного количества карточек (нужен что бы не сбрасывалось количество отображаемых карточек при постановке/снятии лайка)
	const [fixedCardsAmount, setFixedCardsAmount] = React.useState(null);

	// Стейт количества добавляемых карточек фильмов кнопкой "Ещё"
	const [addedCardsAmount, setAddedCardsAmount] = React.useState(null);

	// Стейт с готовым для отрисовки массивом карточек
	const [renderedCards, setRenderedCards] = React.useState([]);

	// Функция определения количества отображаемых и добавляемых
	// кнопкой "Eщё" карточек в зависимости от ширины окна
	const changeCardsAmount = React.useCallback(() => {
		if (document.documentElement.clientWidth > 997) {
			if (fixedCardsAmount) {
				setRenderedCardsAmount(fixedCardsAmount);
			} else {
				setRenderedCardsAmount(12);
			}
			setAddedCardsAmount(3);
		} else if (document.documentElement.clientWidth > 639) {
			if (fixedCardsAmount) {
				setRenderedCardsAmount(fixedCardsAmount);
			} else {
				setRenderedCardsAmount(8);
			}
			setAddedCardsAmount(2);
		} else {
			if (fixedCardsAmount) {
				setRenderedCardsAmount(fixedCardsAmount);
			} else {
				setRenderedCardsAmount(5);
			}
			setAddedCardsAmount(1);
		}
	}, [fixedCardsAmount]);

	// Определяем первоначальное количество карточек для текущей ширины окна
	// (отображаемых и подгружаемых при нажатии на кнопку "Ещё")
	React.useEffect(() => {
		changeCardsAmount();
	}, [changeCardsAmount]);

	// Определяем первоначальный массив карточек для текущей ширины окна
	React.useEffect(() => {
		setRenderedCards(renderedMovies.slice(0, renderedCardsAmount));
	}, [renderedMovies, renderedCardsAmount]);

	// Обработчик нажатия кнопки "Ещё"
	const handleMoreButtonClick = () => {
		// если фиксированное количество карточек ранее уже было установлено, делаем к нему добавку, если же количество карточек меняется в первый раз, берем за основу renderedCardsAmount
		if (fixedCardsAmount) {
			setFixedCardsAmount((prevState) => {
				return (prevState = prevState + addedCardsAmount);
			});
		} else {
			setFixedCardsAmount(renderedCardsAmount + addedCardsAmount);
		}
		// делаем добавку к массиву отображаемых карточек
		setRenderedCards(
			renderedCards.concat(
				renderedMovies.slice(
					renderedCards.length,
					renderedCards.length + addedCardsAmount
				)
			)
		);
	};

	// Запускаем слушатель текущей ширины окна
	React.useEffect(() => {
		const handleScreenResize = (e) => {
			setTimeout(changeCardsAmount, 2000);
		};
		window.addEventListener('resize', handleScreenResize);
		return () => {
			window.removeEventListener('resize', handleScreenResize);
		};
	}, [changeCardsAmount]);

	// Определяем видимость кнопки "Ещё" в зависимости от длины отображаемого массива
	React.useEffect(() => {
		if (renderedCards.length === renderedMovies.length) {
			setIsMoreButtonVisible(false);
		} else {
			setIsMoreButtonVisible(true);
		}
	}, [renderedCards, renderedMovies]);

	return (
		<div className='movies-card-list'>
			<ul className='movies-card-list__list'>
				{renderedCards.map((movie) => {
					return <MoviesCard key={movie.movieId} movie={movie} />;
				})}
			</ul>
			<Route path='/movies'>
				{isMoreButtonVisible && (
					<button
						className='app__link app__button movies-card-list__more-button'
						type='button'
						onClick={handleMoreButtonClick}>
						Ещё
					</button>
				)}
			</Route>
		</div>
	);
}

export default MoviesCardList;

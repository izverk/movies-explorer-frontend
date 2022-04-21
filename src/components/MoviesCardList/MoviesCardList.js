import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCardList() {
	const context = React.useContext(CurrentUserContext);
	const { renderedMovies } = context;

	// Стейт кнопки "Ещё"
	const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(true);
	// Стейт количества карточек для отрисовки
	const [renderedCardsAmount, setRenderedCardsAmount] = React.useState(0);
	// Стейт количества добавляемых карточек фильмов кнопкой "Ещё"
	const [addedCardsAmount, setAddedCardsAmount] = React.useState(0);
	// Стейт с готовым для отрисовки массивом карточек
	const [renderedCards, setRenderedCards] = React.useState([]);

	// Функция определения количества отображаемых
	// и добавляемых кнопкой "Eщё" карточек в зависимости от ширины окна
	const changeCardsAmount = () => {
		if (document.documentElement.clientWidth > 997) {
			setRenderedCardsAmount(12);
			setAddedCardsAmount(3);
		} else if (document.documentElement.clientWidth > 639) {
			setRenderedCardsAmount(8);
			setAddedCardsAmount(2);
		} else {
			setRenderedCardsAmount(5);
			setAddedCardsAmount(1);
		}
	};
	// Определяем первоначальное количество карточек для текущей ширины окна
	// (отображаемых и подгружаемых при нажатии на кнопку "Ещё")
	React.useEffect(() => {
		changeCardsAmount();
	}, []);

	// Определяем первоначальный массив карточек для текущей ширины окна
	React.useEffect(() => {
		setRenderedCards(renderedMovies.slice(0, renderedCardsAmount));
	}, [renderedMovies, renderedCardsAmount]);

	// Запускаем слушатель текущей ширины окна
	React.useEffect(() => {
		const handleScreenResize = (e) => {
			setTimeout(changeCardsAmount, 2000);
		};
		window.addEventListener('resize', handleScreenResize);
		return () => {
			window.removeEventListener('resize', handleScreenResize);
		};
	}, []);
	// Определяем видимость кнопки "Ещё" в зависимости от длины отображаемого массива
	React.useEffect(() => {
		if (renderedCards.length === renderedMovies.length) {
			setIsMoreButtonVisible(false);
		} else {
			setIsMoreButtonVisible(true);
		}
	}, [renderedCards, renderedMovies]);

	// Обработчик нажатия кнопки "Ещё"
	const handleMoreButtonClick = () => {
		setRenderedCards(
			renderedCards.concat(
				renderedMovies.slice(
					renderedCards.length,
					renderedCards.length + addedCardsAmount
				)
			)
		);
	};

	return (
		<div className='movies-card-list'>
			<ul className='movies-card-list__list'>
				{renderedCards.map((movie) => {
					return <MoviesCard key={movie.movieId} movie={movie} />;
				})}
			</ul>
			{isMoreButtonVisible && (
				<button
					className='app__link app__button movies-card-list__more-button'
					type='button'
					onClick={handleMoreButtonClick}>
					Ещё
				</button>
			)}
		</div>
	);
}

export default MoviesCardList;

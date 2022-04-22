import React from 'react';
import './MoviesLikeButton.css';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesLikeButton({ movie }) {
	const context = React.useContext(CurrentUserContext);
	const { movies, savedMovies, setSavedMovies } = context;

	// Обработка клика лайка
	const handleLikeClick = () => {
		// сначала смотрим лайкнутый фильм или нет
		if (!movie.isLiked) {
			// для нелайкнутого:
			// находим карточку в массиве с необработанной длительностью фильма
			const savedMovie = movies.find((item) => {
				return movie.movieId === item.movieId;
			});
			// отправляем запрос на сервер
			mainApi
				.createCard(savedMovie)
				.then((movie) => {
					// добавляем фильм в массив сохраненных фильмов
					setSavedMovies([...savedMovies, movie]);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			// для лайкнутого:
			// находим карточку в массиве сохраненных фильмов
			const deletedMovie = savedMovies.find((item) => {
				return movie.movieId === item.movieId;
			});
			// а вот в БД при сохранении присваивается уже свой айдишник -_id, его и отправляем для удаления карточки (он есть в сохраненных фильмах, т.к. они получены с сервера)
			mainApi
				.deleteCard(deletedMovie._id)
				.then(() => {
					setSavedMovies((prevState) => {
						// метод splice возвращает не измененный массив, а удаленные элементы, поэтому использую вспомогательный промежуточный массив
						const newArray = [...prevState];
						newArray.splice(prevState.indexOf(deletedMovie), 1);
						return (prevState = [...newArray]);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<button
			className={`movies-like-button${
				movie.isLiked ? ' movies-like-button_active' : ''
			}`}
			onClick={handleLikeClick}></button>
	);
}

export default MoviesLikeButton;

import React from 'react';
import './MoviesDelButton.css';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesDelButton({ movie }) {
	const context = React.useContext(CurrentUserContext);
	const { savedMovies, setSavedMovies } = context;

	// Обработка клика удаления карточки
	const handleDelClick = () => {
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
	};

	return (
		<button
			className='movies-del-button movies-card__movies-del-button'
			onClick={handleDelClick}></button>
	);
}

export default MoviesDelButton;

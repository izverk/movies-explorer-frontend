import React from 'react';
import { useHistory } from 'react-router-dom';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../utils/utils';
import mainApi from '../../utils/MainApi';
import {
	formSubmitErrorText,
	formSubmitSuccesText,
} from '../../utils/constants';

function Profile() {
	const history = useHistory();

	const context = React.useContext(CurrentUserContext);
	const {
		setInitialMovies,
		setIsLoggedIn,
		currentUser,
		setCurrentUser,
		setMovies,
		setMoviesInputValue,
		setShortFilmsCheckboxValue,
		formSubmitError,
		setFormSubmitError,
		setIsFirstSearchHappened,
	} = context;

	// Стейт сообщения пользователю об успешной отправке данных
	const [formSubmitSucces, setFormSubmitSucces] = React.useState(null);

	// Выход из профиля (меняем стейты, удаляем данные текущего пользователя из хранилища и редиректим на главную)
	const handleProfileExit = (e) => {
		setInitialMovies([]);
		setMovies([]);
		setMoviesInputValue('');
		setShortFilmsCheckboxValue(false);
		setIsFirstSearchHappened(false);
		try {
			localStorage.removeItem('token');
			localStorage.removeItem('movies');
			localStorage.removeItem('moviesInputValue');
			localStorage.removeItem('shortFilmsCheckboxValue');
		} catch (err) {
			console.log(err);
		}
		setIsLoggedIn(false);
		setCurrentUser({});
		history.push('/');
	};

	// Набор переменных и функций для валидации формы ввода
	const { values, errors, isValid, handleValuesChange, resetValidation } =
		useFormValidation();

	// Заполняем инпуты значениями полей профиля при монтировании компонента
	React.useEffect(() => {
		resetValidation({
			values: {
				nameInput: currentUser.name,
				emailInput: currentUser.email,
			},
		});
	}, [currentUser.name, currentUser.email, resetValidation]);

	// Очищаем стейты сообщений пользователю о результатах отправки данных
	React.useEffect(() => {
		setFormSubmitSucces(null);
		setFormSubmitError(null);
	}, [setFormSubmitError]);

	// Обработчик отправки формы
	const handleSubmit = (e) => {
		e.preventDefault();
		setFormSubmitSucces(null);
		setFormSubmitError(null);
		mainApi
			.editProfile({ name: values.nameInput, email: values.emailInput })
			.then((userData) => {
				setCurrentUser({
					...userData,
					name: userData.name,
					email: userData.email,
				});
				setFormSubmitSucces(formSubmitSuccesText);
			})
			.catch((err) => {
				console.log(err);
				// выводим ошибку отправки данных
				setFormSubmitError(formSubmitErrorText);
			});
	};

	return (
		<form className='profile' name='user-profile-form' noValidate>
			<h2 className='profile__title'>{currentUser.name}</h2>
			<div className='profile__inputs-container'>
				<div className='profile__input-wrapper'>
					<label
						className='profile__input-label'
						htmlFor='profile-username-input'>
						Имя
					</label>
					<input
						className='profile__input'
						type='text'
						name='nameInput'
						required
						minLength='3'
						maxLength='16'
						value={values.nameInput || ''}
						onChange={handleValuesChange}
					/>
					<span className={`profile__input-error profile__input-error_active`}>
						{errors.nameInput}
					</span>
				</div>
				<div className='profile__input-wrapper'>
					<label className='profile__input-label' htmlFor='profile-email-input'>
						Почта
					</label>
					<input
						className='profile__input'
						type='email'
						name='emailInput'
						required
						value={values.emailInput || ''}
						onChange={handleValuesChange}
					/>
					<span className={`profile__input-error profile__input-error_active`}>
						{errors.emailInput}
					</span>
				</div>
			</div>
			<div className='profile__buttons-container'>
				<span
					className={`profile__submit-result${
						formSubmitError || formSubmitSucces
							? ' profile__submit-result_active'
							: ''
					}${formSubmitError ? ' profile__submit-result_type_error' : ''}`}>
					{formSubmitError || formSubmitSucces}
				</span>
				<button
					className={`app__link profile__button${
						!isValid ? ' profile__button_inactive' : ''
					}`}
					type='submit'
					onClick={handleSubmit}
					disabled={!isValid ? true : false}>
					Редактировать
				</button>
				<button
					className='app__link profile__button'
					type='button'
					onClick={handleProfileExit}>
					Выйти из аккаунта
				</button>
			</div>
		</form>
	);
}

export default Profile;

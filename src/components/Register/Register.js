import React from 'react';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import { useFormValidation } from '../../utils/utils';

function Register({ registerUser, formSubmitError, setFormSubmitError }) {
	// Набор переменных и функций для валидации формы ввода
	const { values, errors, isValid, handleValuesChange, resetValidation } =
		useFormValidation();

	// Сбрасываем валидацию один раз при монтировании
	React.useEffect(() => {
		resetValidation({});
	}, [resetValidation]);

	// Обработчик отправки формы
	const handleSubmit = (e) => {
		e.preventDefault();
		setFormSubmitError(null);
		registerUser({
			name: values.nameInput,
			email: values.emailInput,
			password: values.passwordInput,
		});
	};

	return (
		<AuthForm
			title='Добро пожаловать!'
			buttonText='Зарегистрироваться'
			text='Уже зарегистрированы?'
			linkText='Войти'
			linkPath='/signin'
			isValid={isValid}
			formSubmitError={formSubmitError}
			setFormSubmitError={setFormSubmitError}
			handleSubmit={handleSubmit}>
			<Input
				labelText='Имя'
				type='text'
				name='nameInput'
				minLength={3}
				maxLength={16}
				required={true}
				values={values}
				handleValuesChange={handleValuesChange}
				errors={errors}
			/>
			<Input
				labelText='E-mail'
				type='email'
				name='emailInput'
				required={true}
				values={values}
				handleValuesChange={handleValuesChange}
				errors={errors}
			/>
			<Input
				labelText='Пароль'
				type='password'
				name='passwordInput'
				minLength={6}
				required={true}
				values={values}
				handleValuesChange={handleValuesChange}
				errors={errors}
			/>
		</AuthForm>
	);
}

export default Register;

import React from 'react';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import { useFormValidation } from '../../utils/utils';

function Register({ regSubmitError, setRegSubmitError }) {
	// Набор переменных и функций для валидации формы ввода
	const { values, errors, isValid, handleValuesChange, resetValidation } =
		useFormValidation();

	// Сбрасываем валидацию один раз при монтировании
	React.useEffect(() => {
		resetValidation({});
	}, [resetValidation]);

	return (
		<AuthForm
			title='Добро пожаловать!'
			buttonText='Зарегистрироваться'
			text='Уже зарегистрированы?'
			linkText='Войти'
			linkPath='/signin'
			isValid={isValid}
			regSubmitError={regSubmitError}
			setRegSubmitError={setRegSubmitError}>
			<Input
				labelText='Имя'
				type='text'
				name='name-input'
				id='name-input'
				required={true}
				values={values}
				handleValuesChange={handleValuesChange}
				errors={errors}
			/>
			<Input
				labelText='E-mail'
				type='email'
				name='email-input'
				id='email-input'
				required={true}
				values={values}
				handleValuesChange={handleValuesChange}
				errors={errors}
			/>
			<Input
				labelText='Пароль'
				type='password'
				name='password-input'
				id='password-input'
				required={true}
				values={values}
				handleValuesChange={handleValuesChange}
				errors={errors}
			/>
		</AuthForm>
	);
}

export default Register;

import React from 'react';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import { useFormValidation } from '../../utils/utils';

function Login({ loginUser, formSubmitError, setFormSubmitError }) {
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
		loginUser({
			email: values.emailInput,
			password: values.passwordInput,
		});
	};
	return (
		<AuthForm
			title='Рады видеть!'
			buttonText='Войти'
			text='Ещё не зарегистрированы?'
			linkText='Регистрация'
			linkPath='/signup'
			isValid={isValid}
			formSubmitError={formSubmitError}
			setFormSubmitError={setFormSubmitError}
			handleSubmit={handleSubmit}>
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

export default Login;

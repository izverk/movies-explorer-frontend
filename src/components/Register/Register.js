import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Register() {
    return (
        <AuthForm
            title='Добро пожаловать!'
            buttonText='Зарегистрироваться'
            text='Уже зарегистрированы?'
            linkText='Войти'
            linkPath='/signin'
        >
            <Input
                labelText='Имя'
                type='text'
                name='name-input'
                id='name-input'
                defaultValue='Виталий'
            />
            <Input
                labelText='E-mail'
                type='email'
                name='email-input'
                id='email-input'
                defaultValue='pochta@yandex.ru'
            />
            <Input
                labelText='Пароль'
                type='password'
                name='password-input'
                id='password-input'
            />
        </AuthForm>
    );
}

export default Register;
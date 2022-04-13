import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Login() {
    return (
        <AuthForm
            title='Рады видеть!'
            buttonText='Войти'
            text='Ещё не зарегистрированы?'
            linkText='Регистрация'
            linkPath='/signup'
        >
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

export default Login;
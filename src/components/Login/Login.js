import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';

function Login() {
    return (
        <>
            <Logo />
            <span>Ещё не зарегистрированы?</span>
            <Link to='/signup'>Регистрация</Link>
        </>
    );
}

export default Login;
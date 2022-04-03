import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';

function Register() {
    return (
        <>
            <Logo />
            <span>Уже зарегистрированы?</span>
            <Link to='/signin'>Войти</Link>
        </>
    );
}

export default Register;
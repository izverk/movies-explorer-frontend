import { Link } from 'react-router-dom';
import './AuthForm.css';
import Logo from '../Logo/Logo';

function AuthForm({ children, title, text, buttonText, linkText, linkPath }) {

    const isValid = false;

    return (
        <form className='auth-form' name='auth-form'
            noValidate>
            <Logo />
            <h2 className='auth-form__title'>
                {title}
            </h2>
            <div className='auth-form__inputs-container'>
                {children}
                <span className={`auth-form__input-error${!isValid ? ' auth-form__input-error_active' : ''}`}>
                    Что-то пошло не так...
                </span>
            </div>
            <div className='auth-form__buttons-container'>
                <button className='app__link app__button auth-form__submit-button' type='submit'>
                    {buttonText}
                </button>
                <span className='auth-form__link-wrapper'>
                    {text + ' '}
                    <Link to={linkPath} className='app__link auth-form__link'>
                        {linkText}
                    </Link>
                </span>

            </div>
        </form>
    );
}

export default AuthForm;
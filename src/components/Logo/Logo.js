import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/icon_logo.svg';

function Logo() {
    return (
        <Link to='/' className='app__link'>
            <img className='logo' src={logo} alt='Логотип сайта' title='Переход на страницу "О проекте"' />
        </Link>
    );
}

export default Logo;
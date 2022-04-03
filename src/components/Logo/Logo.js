import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo.svg';

function Logo() {
    return (
        <Link to='/'>
            <img className='Logo' src={logo} alt='Логотип сайта' title='О проекте' />
        </Link>
    );
}

export default Logo;
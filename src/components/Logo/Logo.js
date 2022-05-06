import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/icon_logo.svg';

function Logo() {
	return (
		<Link to='/' className='app__link app__button'>
			<img
				className='logo'
				src={logo}
				alt='Логотип сайта'
				title='На главную страницу'
			/>
		</Link>
	);
}

export default Logo;

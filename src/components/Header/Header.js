import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import ProfileButton from '../ProfileButton/ProfileButton';

function Header({ isLoggedIn, openModalMenu }) {
	return (
		<header
			className={`header app__wide-section${
				isLoggedIn ? ' header_background_no' : ''
			}`}>
			<div className='header__container'>
				<Logo />
				{!isLoggedIn ? (
					<div className='header__reg-bar'>
						<Link to='/signup' className='app__link header__signup-link'>
							Регистрация
						</Link>
						<Link
							to='/signin'
							className='app__link app__button header__signin-link'>
							Войти
						</Link>
					</div>
				) : (
					<>
						<nav className='header__nav-bar'>
							<NavLink
								to='/movies'
								className='app__link header__nav-link'
								activeClassName='header__nav-link_active'
								title='На страницу поиска фильмов'>
								Фильмы
							</NavLink>
							<NavLink
								to='/saved-movies'
								className='app__link header__nav-link'
								activeClassName='header__nav-link_active'
								title='На страницу страницу просмотра и поиска сохраненных фильмов'>
								Сохраненные фильмы
							</NavLink>
							<ProfileButton />
						</nav>
						<button
							onClick={openModalMenu}
							className='app__link header__menu-button'
							type='button'
							title='Вызов меню навигации'></button>
					</>
				)}
			</div>
		</header>
	);
}

export default Header;

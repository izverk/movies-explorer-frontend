import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import profileIcon from '../../images/icon_profile.svg';
import menuIcon from '../../images/icon_menu.svg';
import Logo from '../Logo/Logo';

function Header({ loggedIn }) {

  return (
    <header className={`header app__wide-section${loggedIn ? ' header_background_no' : ''}`}>
      <Logo />
      {!loggedIn ? (
        <div className='header__reg-links'>
          <Link to='/signup' className='app__link header__signup-link'>
            Регистрация
          </Link>
          <Link to='/signin' className='app__link app__button header__signin-link'>
            Войти
          </Link>
        </div>
      ) : (
        <nav className='header__nav-links'>
          <NavLink to='/movies' className='app__link header__nav-link' activeClassName='header__nav-link_active'>
            Фильмы
          </NavLink>
          <NavLink to='/saved-movies' className='app__link header__nav-link' activeClassName='header__nav-link_active'>
            Сохраненные фильмы
          </NavLink>
          <Link to='/profile' className='app__link header__profile-link'>
            <span className='header__profile-link-text'>
              Аккаунт
            </span>
            <img className='header__profile-icon' src={profileIcon} alt='Иконка кнопки перехода к профилю пользователя' />
          </Link>
          <button className='app__link header__menu-button' type='button' title='Вызов меню навигации'>
            <img className='header__menu-button-icon' src={menuIcon} alt='Иконка кнопки вызова меню навигации' />
          </button>
        </nav>
      )
      }
    </header >
  );
}

export default Header;

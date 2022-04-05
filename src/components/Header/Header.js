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
        <ul className='header__reg-links-container'>

          <li>
            <Link to='/signup' className='header__signup-link app__link app__link_color_white'>Регистрация</Link>
          </li>

          <li>
            <Link to='/signin' className='header__signin-link app__link'>Войти</Link>
          </li>

        </ul>
      ) : (
        <div className='header__navigation-container'>

          <ul className='header__movies-links-list'>
            <li className='header__movies-links-item'>
              <NavLink to='/movies' className='app__link header__movies-link' activeClassName='header__movies-link_active'>
                Фильмы
              </NavLink>
            </li>
            <li className='header__movies-links-item'>
              <NavLink to='/saved-movies' className='app__link header__movies-link' activeClassName='header__movies-link_active'>
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>


          <Link to='/profile' className='app__link header__profile-link' title='Переход на страницу "Профиль пользователя"'>
            <span className='header__profile-link-text'>
              Аккаунт
            </span>
            <img className='header__profile-icon' src={profileIcon} alt='Иконка профиля пользователя' />
          </Link>

          <button className='app__link header__menu-button' type='button'>
            <img className='header__menu-button-icon' src={menuIcon} alt='Кнопка профиля пользователя' title='Переход на страницу "Профиль пользователя"' />
          </button>
        </div>
      )
      }
    </header >
  );
}

export default Header;

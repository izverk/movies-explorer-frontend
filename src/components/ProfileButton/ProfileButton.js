import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileButton.css';
import profileIcon from '../../images/icon_profile.svg';

function ProfileButton({ closeModalMenu }) {

  return (
    <Link
      to='/profile'
      className='app__link profile-button'
      onClick={closeModalMenu}>
      <span className='profile-button__text'>
        Аккаунт
      </span>
      <img className='profile-button__icon' src={profileIcon} alt='Иконка кнопки перехода к профилю пользователя' />
    </Link>
  )
}

export default ProfileButton;

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';

function Header({ loggedIn }) {

    return (
        <header className='Header'>

            <Logo />

            {!loggedIn ?
                <>
                    <Link to='/signup'>
                        Регистрация
                    </Link>
                    <Link to='/signin'>
                        Войти
                    </Link>
                </>
                :
                <>
                    <Link to='/movies'>
                        Фильмы
                    </Link>
                    <Link to='/saved-movies'>
                        Сохраненные фильмы
                    </Link>
                    <Link to='/profile'>
                        Аккаунт
                    </Link>
                </>
            }

        </header>
    );
}

export default Header;
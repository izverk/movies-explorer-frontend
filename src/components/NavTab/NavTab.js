import React from 'react';
import './NavTab.css';

function NavTab() {
    return (
        <nav className='nav-tab'>
            <ul className='nav-tab__list'>
                <li className='nav-tab__list-item'>
                    <a href='#about-project' className='app__link nav-tab__link'>
                        О проекте
                    </a>
                </li>
                <li className='nav-tab__list-item'>
                    <a href='#techs' className='app__link nav-tab__link'>
                        Технологии
                    </a>
                </li>
                <li className='nav-tab__list-item'>
                    <a href='#about-me' className='app__link nav-tab__link'>
                        Студент
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;
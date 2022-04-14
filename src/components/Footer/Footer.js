import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h2 className='footer__title'>
                Учебный проект Яндекс.Практикум х BeatFilm.
            </h2>
            <div className='footer__container'>
                <ul className='footer__links-list'>
                    <li className='footer__links-item'>
                        <a className='app__links footer__link' href='https://practicum.yandex.ru/' rel='noreferrer' target='_blank' title='https://practicum.yandex.ru/'>
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className='footer__links-item'>
                        <a className='app__links footer__link' href='https://github.com/' rel='noreferrer' target='_blank' title='https://github.com/'>
                            Github
                        </a>
                    </li>
                    <li className='footer__links-item'>
                        <a className='app__links footer__link' href='https://www.facebook.com/' rel='noreferrer' target='_blank' title='https://www.facebook.com/'>
                            Facebook
                        </a>
                    </li>
                </ul>
                <span className='footer__copyright'>
                    © 2022
                </span>
            </div>
        </footer>
    );
}

export default Footer;
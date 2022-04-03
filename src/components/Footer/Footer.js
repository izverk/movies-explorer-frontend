import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="Footer">
            ПОДВАЛ САЙТА
            <span>Учебный проект Яндекс.Практикум х BeatFilm.</span>
            <span>© 2022</span>
            <a href='https://practicum.yandex.ru/' rel='noreferrer' target='_blank'>Яндекс.Практикум</a>
            <a href='https://github.com/' rel='noreferrer' target='_blank'>Github</a>
            <a href='https://www.facebook.com/' rel='noreferrer' target='_blank'>Facebook</a>
        </footer>
    );
}

export default Footer;
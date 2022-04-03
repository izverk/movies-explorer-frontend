import React from 'react';
import './Portfolio.css';

function Portfolio() {
    return (
        <div className='Portfolio'>
            Портфолио
            <a href='https://github.com/izverk/how-to-learn' rel='noreferrer' target='_blank'>Статичный сайт</a>
            <a href='https://github.com/izverk/russian-travel' rel='noreferrer' target='_blank'>Адаптивный сайт</a>
            <a href='https://github.com/izverk/react-mesto-api-full' rel='noreferrer' target='_blank'>Одностраничное приложение</a>
        </div>
    );
}

export default Portfolio;
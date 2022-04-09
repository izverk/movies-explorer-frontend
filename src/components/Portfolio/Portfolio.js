import React from 'react';
import './Portfolio.css';
import arrowIcon from '../../images/icon_arrow.svg';

function Portfolio() {
    return (
        <div className='portfolio'>
            <h4 className='portfolio__title'>
                Портфолио
            </h4>
            <ul className='portfolio__list'>
                <li className='portfolio__list-item'>
                    <a className='app__link portfolio__project-name' href='https://github.com/izverk/how-to-learn' rel='noreferrer' target='_blank'>
                        Статичный сайт
                    </a>
                    <a className='app__link' href='https://github.com/izverk/how-to-learn' rel='noreferrer' target='_blank'>
                        <img className='portfolio__arrow-icon' src={arrowIcon} alt='Иконка-стрелка' />
                    </a>
                </li>
                <li className='portfolio__list-item'>
                    <a className='app__link portfolio__project-name' href='https://github.com/izverk/russian-travel' rel='noreferrer' target='_blank'>
                        Адаптивный сайт
                    </a>
                    <a className='app__link portfolio__project-arrow' href='https://github.com/izverk/russian-travel' rel='noreferrer' target='_blank'>
                        <img className='portfolio__arrow-icon' src={arrowIcon} alt='Иконка-стрелка' />
                    </a>
                </li>
                <li className='portfolio__list-item'>
                    <a className='app__link portfolio__project-name' href='https://github.com/izverk/react-mesto-api-full' rel='noreferrer' target='_blank'>
                        Одностраничное приложение
                    </a>
                    <a className='app__link portfolio__project-arrow' href='https://github.com/izverk/react-mesto-api-full' rel='noreferrer' target='_blank'>
                        <img className='portfolio__arrow-icon' src={arrowIcon} alt='Иконка-стрелка' />
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Portfolio;
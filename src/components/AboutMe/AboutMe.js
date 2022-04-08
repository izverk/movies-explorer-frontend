import React from 'react';
import './AboutMe.css';
import authorPhoto from '../../images/img_user_photo.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <section className='about-me' id='about-me'>
            <SectionTitle>
                Студент
            </SectionTitle>
            <div className='about-me__table'>
                <img className='about-me__photo-column' src={authorPhoto} alt='Фото автора сайта'></img>
                <div className='about-me__info-column'>
                    <h3 className='about-me__name'>
                        Виталий
                    </h3>
                    <p className='about-me__job'>
                        Фронтенд-разработчик, 30 лет
                    </p>
                    <p className='about-me__topic'>
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a className='app__link about-me__link' href='app__link https://ru-ru.facebook.com'>
                        Facebook
                    </a>
                    <a className='app__link about-me__link' href='app__link https://github.com/izverk'>
                        Github
                    </a>
                </div>
            </div>
            <Portfolio />
        </section>
    );
}

export default AboutMe;
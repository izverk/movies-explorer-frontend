import React from 'react';
import './AboutMe.css';
import authorPhoto from '../../images/img_me_photo.jpeg';
import SectionTitle from '../SectionTitle/SectionTitle';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
	return (
		<section className='about-me' id='about-me'>
			<SectionTitle>Студент</SectionTitle>
			<div className='about-me__table'>
				<img
					className='about-me__photo-column'
					src={authorPhoto}
					alt='Фото автора сайта'></img>
				<div className='about-me__info-column'>
					<h3 className='about-me__name'>Илья</h3>
					<p className='about-me__job'>Фронтенд-разработчик, 43 года</p>
					<p className='about-me__topic'>
						Я родился и вырос в Хабаровске. Закончил университет (СибГУТИ) по
						специальности радиосвязь. Получил большой стаж работы в сфере
						госуправления телекоммуникациями. В 2019 вместе с семьёй переехал в
						Санкт-Петербург. Семья дружная - жена и три дочери. Мои увлечения -
						музыка, спорт, а с недавнего времени и программирование. В какой-то
						момент осознал необходимость дальнейшего развития и прошел курс
						обучения в Яндекс-Практикуме по специальности веб-разработка
						(закончил весной 2022 года). Сейчас продолжаю самостоятельное
						изучение этой интересной области, имея целью стать профессионалом и
						участвовать в создании востребованных цифровых продуктов.
					</p>
					<a
						className='app__link about-me__link'
						href='https://ru-ru.facebook.com'
						rel='noreferrer'
						target='_blank'
						title='https://ru-ru.facebook.com'>
						Facebook
					</a>
					<a
						className='app__link about-me__link'
						href='https://github.com/izverk?tab=repositories'
						rel='noreferrer'
						target='_blank'
						title='Моя страница на Github'>
						Github
					</a>
				</div>
			</div>
			<Portfolio />
		</section>
	);
}

export default AboutMe;

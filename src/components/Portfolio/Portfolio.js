import React from 'react';
import './Portfolio.css';
import arrowIcon from '../../images/icon_arrow.svg';

function Portfolio() {
	return (
		<div className='portfolio'>
			<h4 className='portfolio__title'>Портфолио</h4>
			<ul className='portfolio__list'>
				<li className='portfolio__list-item'>
					<a
						className='app__link portfolio__project-name'
						href='https://izverk.github.io/how-to-learn/'
						rel='noreferrer'
						target='_blank'
						title='https://izverk.github.io/how-to-learn/'>
						Статичный сайт
					</a>
					<a
						className='app__link'
						href='https://izverk.github.io/how-to-learn/'
						rel='noreferrer'
						target='_blank'
						title='hhttps://izverk.github.io/how-to-learn/'>
						<img
							className='portfolio__arrow-icon'
							src={arrowIcon}
							alt='Иконка-стрелка'
						/>
					</a>
				</li>
				<li className='portfolio__list-item'>
					<a
						className='app__link portfolio__project-name'
						href='https://izverk.github.io/russian-travel/'
						rel='noreferrer'
						target='_blank'
						title='https://izverk.github.io/russian-travel/'>
						Адаптивный сайт
					</a>
					<a
						className='app__link portfolio__project-arrow'
						href='https://izverk.github.io/russian-travel/'
						rel='noreferrer'
						target='_blank'
						title='https://izverk.github.io/russian-travel/'>
						<img
							className='portfolio__arrow-icon'
							src={arrowIcon}
							alt='Иконка-стрелка'
						/>
					</a>
				</li>
				<li className='portfolio__list-item'>
					<a
						className='app__link portfolio__project-name'
						href='https://izverk.students.nomoredomains.xyz/'
						rel='noreferrer'
						target='_blank'
						title='https://izverk.students.nomoredomains.xyz/'>
						Одностраничное приложение
					</a>
					<a
						className='app__link portfolio__project-arrow'
						href='https://izverk.students.nomoredomains.xyz/'
						rel='noreferrer'
						target='_blank'
						title='https://izverk.students.nomoredomains.xyz/'>
						<img
							className='portfolio__arrow-icon'
							src={arrowIcon}
							alt='Иконка-стрелка'
						/>
					</a>
				</li>
			</ul>
		</div>
	);
}

export default Portfolio;

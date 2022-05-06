import React from 'react';
import './InfoModal.css';
import successIcon from '../images/icon_success.svg';
import failedIcon from '../images/icon_failed.svg';

function InfoModal({ infoModal, setInfoModal }) {
	React.useEffect(() => {
		setTimeout(() => {
			setInfoModal({ ...infoModal, isOpen: false });
		}, 2000);
	});

	return (
		<div
			className={`info-modal${infoModal.isOpen ? ' info-modal_active' : ''}`}>
			<div className='info-modal__container'>
				<button
					type='button'
					className='app__button info-modal__close-button'
					onClick={setInfoModal({ ...infoModal, isOpen: false })}></button>
				<img
					className='info-modal__icon'
					src={infoModal.isSucces ? successIcon : failedIcon}
					alt='Иконка с результатом действия пользователя'
				/>
				<span className='popup__message'>{infoModal.message}</span>
			</div>
		</div>
	);
}

export default InfoModal;

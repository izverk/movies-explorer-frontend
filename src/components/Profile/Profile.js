import { useHistory } from 'react-router-dom';
import './Profile.css';

function Profile({ loggedIn, setLoggedIn }) {

    const history = useHistory();

    return (
        <form className="profile" name='user-profile-form'
            noValidate>
            <h2 className='profile__title'>
                Привет, Виталий!
            </h2>
            <div className='profile__inputs-container'>
                <div className='profile__input-wrapper'>
                    <label className='profile__input-label' htmlFor='profile-username-input'>
                        Имя
                    </label>
                    <input
                        className='profile__input'
                        type='text'
                        defaultValue='Виталий'
                        name='profile-username-input'
                        id='profile-username-input'
                        required
                        minLength='2'
                        maxLength='30'
                    />
                </div>
                <div className='profile__input-wrapper'>
                    <label className='profile__input-label' htmlFor='profile-email-input'>
                        E-mail
                    </label>
                    <input
                        className='profile__input'
                        type='email'
                        defaultValue='pochta@yandex.ru'
                        name='profile-email-input'
                        id='profile-email-input'
                        required
                    />

                </div>
            </div>
            <div className='profile__buttons-container'>
                <button
                    className='app__link profile__button' type='submit'>
                    Редактировать
                </button>
                <button
                    className='app__link profile__button'
                    type='button'
                    onClick={() => {
                        setLoggedIn(false); history.push('/')
                    }} >
                    Выйти из аккаунта
                </button>
            </div>
        </form>
    );
}

export default Profile;
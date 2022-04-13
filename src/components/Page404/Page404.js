import { useHistory } from 'react-router-dom';
import './Page404.css';

function Page404() {

    const history = useHistory();

    return (
        <div className='page404'>
            <h1 className='page404__title'>
                404
            </h1>
            <p className='page404__text'>
                Страница не найдена
            </p>
            <button
                to='/signin'
                onClick={() => { history.goBack() }}
                className='app__link page404__button'>
                Назад
            </button>
        </div>
    );
}

export default Page404;
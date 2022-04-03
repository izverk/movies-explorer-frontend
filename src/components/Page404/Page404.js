import { useHistory } from 'react-router-dom';
import './Page404.css';

function Page404() {

    const history = useHistory();

    return (
        <div className='Page404'>
            Страница не найдена
            <button to='/signin' onClick={() => { history.goBack() }}>Назад</button>
        </div>
    );
}

export default Page404;
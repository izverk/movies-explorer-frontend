import { NavLink } from 'react-router-dom';
import './ModalMenu.css';
import ProfileButton from '../ProfileButton/ProfileButton';

function ModalMenu({ modalMenuState, closeModalMenu }) {

  return (
    <div className={`nav-menu${modalMenuState ? ' nav-menu_active' : ''}`}>
      <div className='nav-menu__container'>
        <button
          className='app__button nav-menu__close-button '
          type='button'
          onClick={closeModalMenu}
        />
        <nav className='nav-menu__links-container'>
          <NavLink
            exact to='/'
            className='app__link nav-menu__link'
            activeClassName='nav-menu__link_active'
            onClick={closeModalMenu}>

            Главная
          </NavLink>
          <NavLink
            to='/movies'
            className='app__link nav-menu__link'
            activeClassName='nav-menu__link_active'
            onClick={closeModalMenu}>
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className='app__link nav-menu__link'
            activeClassName='nav-menu__link_active'
            onClick={closeModalMenu}>
            Сохраненные фильмы
          </NavLink>
          <ProfileButton closeModalMenu={closeModalMenu} />
        </nav>
      </div>
    </div>
  )
}

export default ModalMenu;
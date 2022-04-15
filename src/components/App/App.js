import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Page404 from '../Page404/Page404'
import ModalMenu from '../ModalMenu/ModalMenu';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  // Стейт с данными текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Стейт авторизованности пользователя
  const [loggedIn, setLoggedIn] = useState(false);

  const [isMoviesLoading] = useState(false);
  const [isSavedMoviesLoading] = useState(false);
  const [modalMenuState, setModalMenuState] = useState(false);
  const changeModalMenuState = () => { setModalMenuState(!modalMenuState) };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Switch>

          <Route exact path='/signin'>
            <Login />
          </Route>

          <Route exact path='/signup'>
            <Register />
          </Route>

          <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>

            <Header loggedIn={loggedIn} openModalMenu={changeModalMenuState} />

            <Switch>
              <Route exact path='/'>
                <Main />
              </Route>
              <Route path='/movies'>
                <Movies isMoviesLoading={isMoviesLoading} />
              </Route>
              <Route path='/saved-movies'>
                <SavedMovies isSavedMoviesLoading={isSavedMoviesLoading} />
              </Route>
              <Route path='/profile'>
                <Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              </Route>
            </Switch>

            <Route exact path={['/', '/movies', '/saved-movies']}>
              <Footer />
            </Route>

          </Route>

          <Route path='*'>
            <Page404 />
          </Route>

        </Switch>
        <ModalMenu modalMenuState={modalMenuState} closeModalMenu={changeModalMenuState} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

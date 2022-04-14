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

function App() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [isMoviesLoading] = useState(false);
  const [isSavedMoviesLoading] = useState(false);
  const [modalMenuState, setModalMenuState] = useState(false);
  const changeModalMenuState = () => { setModalMenuState(!modalMenuState) };

  return (
    <div className='app'>
      <Switch>

        <Route path='/signin'>
          <Login />
        </Route>

        <Route path='/signup'>
          <Register />
        </Route>

        <Route path='/'>
          <Switch>

            <Route exact path='/'>
              <Header loggedIn={loggedIn} openModalMenu={changeModalMenuState} />
              <Main />
              <Footer />
            </Route>

            <Route path='/movies'>
              <Header loggedIn={loggedIn} openModalMenu={changeModalMenuState} />
              <Movies isMoviesLoading={isMoviesLoading} />
              <Footer />
            </Route>

            <Route path='/saved-movies'>
              <Header loggedIn={loggedIn} openModalMenu={changeModalMenuState} />
              <SavedMovies isSavedMoviesLoading={isSavedMoviesLoading} />
              <Footer />
            </Route>

            <Route path='/profile'>
              <Header loggedIn={loggedIn} openModalMenu={changeModalMenuState} />
              <Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </Route>

            <Route path='*'>
              <Page404 />
            </Route>
          </Switch>
        </Route>

      </Switch>
      <ModalMenu modalMenuState={modalMenuState} closeModalMenu={changeModalMenuState} />
    </div>
  );
}

export default App;

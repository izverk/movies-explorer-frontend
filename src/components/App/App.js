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

function App() {

  const [loggedIn] = useState(true);
  const [isMoviesLoading] = useState(false);
  const [isSavedMoviesLoading] = useState(true);

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
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </Route>

            <Route path='/movies'>
              <Header loggedIn={loggedIn} />
              <Movies isMoviesLoading={isMoviesLoading} />
              <Footer />
            </Route>

            <Route path='/saved-movies'>
              <Header loggedIn={loggedIn} />
              <SavedMovies isSavedMoviesLoading={isSavedMoviesLoading} />
              <Footer />
            </Route>

            <Route path='/profile'>
              <Header loggedIn={loggedIn} />
              <Profile />
            </Route>

            <Route path='*'>
              <Page404 />
            </Route>
          </Switch>
        </Route>

      </Switch>
    </div>
  );
}

export default App;

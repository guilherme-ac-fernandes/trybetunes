import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Login from './pages/Login';
import Album from './pages/Album';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/search" render={ () => <Search /> } />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/favorites" render={ () => <Favorites /> } />
          <Route
            path="/profile/edit"
            render={ (props) => <ProfileEdit { ...props } /> }
          />
          <Route path="/profile" render={ () => <Profile /> } />
          <Route
            exact
            path="/"
            render={ (props) => <Login { ...props } /> }
          />
          <Route path="*" render={ () => <NotFound /> } />
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;

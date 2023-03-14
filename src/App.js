import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components /Header';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/header" component={ Header } />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
          {/* <Route exact path="/">
            {logado ? <Redirect to="/dashboard" /> : <Login />}
          </Route> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

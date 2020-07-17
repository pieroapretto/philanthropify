import React from 'react';
import LoginPage from './components/pages/LoginPage';
import { Switch, Route } from 'react-router-dom';
import ProfilePage from './components/pages/ProfilePage';
import NavBarContainer from './components/navbar/NavBar';

function App() {
  return (
    <div id="app-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <NavBarContainer/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Switch>
              <Route path="/" component={LoginPage} exact={true}/>
              <Route path="/account" component={ProfilePage}/>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

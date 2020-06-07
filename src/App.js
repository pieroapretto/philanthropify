import React from 'react';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import { Switch, Route } from 'react-router-dom';
import  DashboardPage from './components/pages/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>TEST!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Switch>
          <Route path="/" component={LoginPage} exact={true}/>
          <Route path="/dashboard" component={DashboardPage}/>
        </Switch>
      </header>
    </div>
  );
}

export default App;

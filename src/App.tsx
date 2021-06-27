import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Workspace from './components/Workspace/Workspace';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';


function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Switch>
          //inicio
          <Route exact path='/' component={Home}/>

          //login
          <Route path='/login' component={Login}/>

          //reuniones
          <Route path='/meets/:id' component={Workspace}/>

          <Redirect to={`/meets/f${(+new Date).toString(16)}`}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

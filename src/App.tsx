import React from 'react';
import Header from './components/Header/Header';
import Settingbar from './components/Settingbar/Settingbar';
import Toolbar from './components/Toolbar/Toolbar';
import Canvas from './components/Workspace/Canvas';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/:id'>
            <Header/>
            <Toolbar/>
            <Settingbar/>
            <Canvas/>
          </Route>
          <Redirect to={`f${(+new Date).toString(16)}`}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

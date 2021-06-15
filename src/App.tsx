import React from 'react';
import Header from './components/Header/Header';
import Settingbar from './components/Settingbar/Settingbar';
import Toolbar from './components/Toolbar/Toolbar';
import Canvas from './components/Workspace/Canvas';

function App() {
  return (
    <div>
      <Header/>
      <Toolbar/>
      <Settingbar/>
      <Canvas/>
    </div>
  );
}

export default App;

import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import GuardRoute from './components/Auth/GuardRoute';
import Meets from './components/Meets/Meets';
import Root from './components/Auth/Root';
import AuthProvider from './components/Application/AuthProvider';
import Title from './components/Application/Title';
import Workspace from './components/Workspace/Workspace';

function App() {

  return (
    <Router>
      <Title />
      <AuthProvider>
        <Root>
          <Header/>
          <Switch>
            {/* inicio */}
            <GuardRoute exact path='/' component={Home} type="public"/>

            {/* login */}
            <GuardRoute path='/login' component={Login} type="public-no-auth"/>

            {/* reuniones */}
            {/* reuniones de un usuario */}
            <GuardRoute path='/meets/me/:user_id' component={Meets} type="auth"/>
            
            {/* reunión */}
            <GuardRoute path='/meets/:id' component={Workspace} type="auth"/>
          </Switch>
        </Root>
      </AuthProvider>
    </Router>
  );
}

export default App;

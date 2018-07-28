import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import BossInfo from './components/BossInfo/BossInfo';


import DashBoard from './components/dashBoard/dashBorad';
import Login from './login/login';
import Register from './register/register';
import AuthRoute from './components/auth/auth';
import {user} from './redux/user.redux';

import './index.css'
const store = createStore(user, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
class GenuisInfo extends React.Component {
  render () {
    return (
      <div>
        牛人页面
      </div>
    );
  }
}
class BossInfo extends React.Component {
  render () {
    return (
      <div>
        牛人页面
      </div>
    );
  }
}
// boss,genuis, me, msg 4个页面
ReactDom.render(<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/bossinfo" component={BossInfo}></Route>
                <Route path="/genuisinfo" component={GenuisInfo}></Route>
                <Route path="/msg" component={DashBoard}></Route>
                <Route path="/me" component={DashBoard}></Route>
                <Route path="/boss" component={DashBoard}></Route>
                <Route path="/genuis" component={DashBoard}></Route>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));


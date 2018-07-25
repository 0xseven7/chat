import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {DashBoard} from './components/dashBoard/dashBorad';


import Login from './login/login';
import Register from './register/register';
import AuthRoute from './components/auth/auth';
import {user} from './redux/user.redux';

const store = createStore(user, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
// boss,genuis, me, msg 4个页面
ReactDom.render(<Provider store={store}>
        <BrowserRouter>
            <div>
              //
              <switch>
                <AuthRoute></AuthRoute>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/bossInfo" component={Register}></Route>
                <Route path="/geniusInfo" component={Register}></Route>
                <Route component={DashBoard}></Route>
              </switch>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));


import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import Login from './login/login';
import Register from './register/register';
import {
    counter
} from './index.redux'

const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

function render() {
    ReactDom.render(<Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'))
}
render();
store.subscribe(render);
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { login } from './Auth.redux';
import { Redirect } from 'react-router-dom';
import { axios } from 'axios';

@connect(
    state => (state.auth);
    { login }
);
class Auth extends Component {
    render() {
        return (
            <div>
                {this.props.isAuth ? <Redirect to='/dashBoard'></Redirect>}
                <h2>你没有权限, 需要登录才能查看</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        );
    }
}

export default Auth;
import React from 'react';

import axios from 'axios';
import {withRouter} from 'react-router-dom';

@withRouter
class AuthRoute extends React.Component {
  componentDidMount () {
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname;

    if (publicList.indexOf(pathname) > -1) {
      return ;
    }
    // 获取用户信息
    // 是否登录
    // 用户的type, boss 还是genuis
    //用户信息是否完整
    axios.get('/user/info').then(res => {
      if (res.status === 200) {
        if (res.data.code === 1) {
          // 有登录信息
        } else {

        }
      }
    });
  }

  render () {
    return null;
  }
}

export default AuthRoute;

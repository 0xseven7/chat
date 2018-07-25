import React from 'react';

import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import  { loadData } from '../../redux/user.redux'
@connect(
  null,
  {loadData}
)

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
        if (res.data.code === 0) {
          // 有登录信息
          this.props.loadData(res.data.data);
        } else {
          this.props.history.push('/login')
        }
      }
    });
  }

  render () {
    return null;
  }
}

export default AuthRoute;

import React from 'react';

import axios from 'axios';

class AuthRoute extends React.Component {
  componentDidMount () {
    // 获取用户信息

    // 是否登录
    // 用户的type, boss 还是genuis
    //用户信息是否完整
    axios.get('/user/info').then(res => {
      if (res.status === 200) {
        console.log(res.data);
      }
    });
  }
}

export default AuthRoute;

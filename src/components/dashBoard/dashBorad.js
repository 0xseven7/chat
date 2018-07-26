import React from 'react';
import {TabBar, NavBar} from 'antd-mobile';
import {connect} from 'react-redux';

import NavLinkBar from '../navlinkbar/NavLinkBar'
@connect(
  (state) => ({user: state})
)


class DashBoard extends React.Component {

  render () {
    const user = this.props.user;
    const  {pathname} = this.props.location;

    console.log(this.props);
    const navList = [
      /**
       * boss页面, type为genuis的时候隐藏
       */
      {
        path: '/boss',
        text: 'Boss',
        icon: 'boss',
        title: 'BOSS列表',
        component: Boss,
        hide: user.type === 'genuis'
      },
      /**
       * 极客页面, type为boss的时候隐藏
       */
      {
        path: '/genuis',
        text: '极客',
        icon: 'genuis',
        title: '极客列表',
        component: Genuis,
        hide: user.type === 'boss'
      },
      /**
       * 消息页面, 不隐藏
       */
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: "message",
      },
      {
        path: '/me',
        text: '个人中心',
        title: '个人中心',
        component: User
      }
    ];
    return (
      <div>
        <NavBar >{navList.find(v=>v.path=== pathname).title}</NavBar>
        <h2>content</h2>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    );
  }
}
class Msg extends React.Component {
  render () {
    return (
      <div>
        消息
      </div>
    );
  }
}

class Genuis extends React.Component {
  render () {
    return (
      <div>
        牛人
      </div>
    );
  }
}

class User extends React.Component {
  render () {
    return (
      <div>
        个人中心
      </div>
    );
  }
}
class Boss extends React.Component {
  render () {
    return (
      <div>
        个人中心
      </div>
    );
  }
}

export default DashBoard;
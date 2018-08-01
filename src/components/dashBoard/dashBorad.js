import React from 'react';
import {NavBar, Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import Boss from '../../components/Boss/Boss';
import Genius from '../../components/Genius/Genius';
import UserInfo from '../../components/userInfo/userInfo';

import NavLinkBar from '../navlinkbar/NavLinkBar';
import {getMsgList, recMsg} from '../../redux/chat.redux';
import Msg from '../../components/msg/Msg';

@connect(
  state => state,
  {recMsg, getMsgList}
)
class DashBoard extends React.Component {
  componentDidMount () {
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList();
      this.props.recMsg();
    }

  }

  render () {
    const user = this.props.user;
    const {pathname} = this.props.location;
    console.log(pathname);
    const navList = [
      /**
       * boss页面, type为genius的时候隐藏
       */
      {
        path: '/boss',
        text: 'Boss',
        icon: 'Boss',
        title: 'boss',
        component: Boss,
        hide: user.type === 'genius',
        selected: true
      },
      /**
       * 极客页面, type为boss的时候隐藏
       */
      {
        path: '/genius',
        text: '极客',
        icon: 'genius',
        title: '极客',
        component: Genius,
        hide: user.type === 'boss',
        selected: true

      },
      /**
       * 消息页面, 不隐藏
       */
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息',
        component: Msg

      },
      {
        path: '/me',
        text: '个人中心',
        title: '我',
        icon: 'me',
        component: UserInfo
      }
    ];
    return (
      <div>
        <NavBar>{navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{marginTop: 10}}>
            <Switch>
              {navList.map(v => (
                <Route component={v.component} path={v.path} key={v.path}></Route>
              ))}
            </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    );
  }
}


export default DashBoard;
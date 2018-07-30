import React from 'react';
import {connect} from 'react-redux';
import browserCookies from 'browser-cookies';
import {Redirect} from 'react-router-dom';

import {Result, Icon, WhiteSpace, List, Button, Modal} from 'antd-mobile';
import {logoutCommit} from '../../redux/user.redux';



@connect(
  state => state.user,
  {logoutCommit}
)
class UserInfo extends React.Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout () {
    // browserCookies.erase('userid');
    // console.log('logout');
    const alert = Modal.alert;

    alert('确定退出登录?', '', [
      {text: '取消'},
      {
        text: '确定', onPress: () => {
          browserCookies.erase('userid');
          this.props.logoutCommit();
        }
      },
    ]);
  }

  render () {
    const Item = List.Item;
    const Brief = Item.Brief;
    console.log(this.props);
    return this.props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 50}} alt=""/>}
          title={this.props.user}
          message={this.props.type === 'boss' ? this.props.compony : null}
        >
        </Result>
        <List renderHeader={() => '简介'}>
          <Item multipleLine>{this.props.position}
            {this.props.desc.split('\n').map(v => (<Brief key={v}>{v}</Brief>))}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={this.props.redirectTo}/>;
  }
}
export default UserInfo;
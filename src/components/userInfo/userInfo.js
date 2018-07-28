import React from 'react';
import {connect} from 'react-redux';

import { Result, Icon, WhiteSpace , List} from 'antd-mobile';

@connect(
  state => state.user
)
class UserInfo extends React.Component {
  render () {
    console.log(this.props);
    const Item = List.Item;
    const Brief = Item.Brief;
    return this.props.user ?  (
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
      </div>
    ) : null;
  }
}

export default UserInfo;
import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@connect (
  state => state
)
@withRouter
class Msg extends React.Component {
  constructor  (props) {
    super(props);
  }
  getLastMsg (arr) {
    return arr[arr.length - 1]
  }
  handleClick  (id) {
    this.props.history.push(`/chat/${id}`)
  }
  render () {
    console.log(this.props);
    const userId = this.props.user._id;
    // 按照聊天用户分组 根据chatId
    const msgGroup = {};
    this.props.chat.chatMsg.forEach( v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || [];
      msgGroup[v.chatId].push(v)
    });
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLastMsg(a).create_time;
      const b_last = this.getLastMsg(b).create_time;
      console.log(a_last, b_last);
      return b_last - a_last;
    });
    console.log(chatList);
    return (
      <div>
        <List>
          {chatList.map(v=> {
            const lastItem = this.getLastMsg(v);
            const unreadNum = v.filter(k => !k.read && k.to === userId).length;
            console.log(unreadNum);
            const targetId = v[0].from === userId ? v[0].to : v[0].from;
            return <List.Item
              onClick={() => this.handleClick(targetId)}
              extra={<Badge text={unreadNum}/>}
              thumb={`../img/${this.props.chat.users[targetId].avatar}.png`}
              key={lastItem._id}
            >{this.props.chat.users[targetId].name}
              <List.Item.Brief>
                {lastItem.content}
              </List.Item.Brief>
            </List.Item>

          })}
        </List>
      </div>
    );
  }
}
export default Msg;
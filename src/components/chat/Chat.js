import React from 'react';
import {withRouter} from 'react-router-dom';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recMsg, readMsg} from '../../redux/chat.redux';
import {getChatId} from '../../util';


@connect(
  state => state,
  {getMsgList, sendMsg, recMsg, readMsg}
)
@withRouter

class Chat extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  componentDidMount () {
    // this.props.getMsgList();
    // this.props.recMsg();
    // socket.on('recMsg', (data)=> {
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // });
    // if (!this.props.chat.chatMsg.length) {
    //
    //   this.props.getMsgList();
    //   this.props.recMsg();
    // }

    this.fixCarousel();
  }
  componentWillUnmount () {
    const targetId = this.props.match.params.user;
    this.props.readMsg(targetId);
  }
  fixCarousel () {
    setTimeout (function () {
      window.dispatchEvent(new Event('resize'))
    }, 0)

  }

  handleSubmit () {
    // socket.emit('sendMsg', {text: this.state.text});
    // this.setState({text: ''})
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg(from, to, msg);
    this.setState({
      text: '',
      showEmoji: false
    })
  }

  render () {
    const targetId = this.props.match.params.user;
    const Item = List.Item;
    const users = this.props.chat.users;
    const chatId = getChatId(targetId, this.props.user._id);
    const chatMsgs = this.props.chat.chatMsg.filter(v => v.chatId === chatId );
    const emojis = '😊 😃 😏 😍 😘 😚 😳 😌 😆 😁 😉 😜 😝 😀 😙 😛 😴 😟 😦 😧 😮 😬 😕 😯 😑 😒 😅 😓 😥 😩 😔 😞 😖 😨 😰 😣 😢 😭 😂 😲 😱 😫 😠 😡 😤 😪 😋 😷 😎 😵 👿 😈 😐 😶 😇 👽'
        .split(' ')
        .map(v=> ({text: v}));
    if (!users[targetId]) {
      return null
    }
    return (
      <div id='chat-page'>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={()=>{this.props.history.goBack()}}
          mode="dark">正与{users[targetId].name}交谈</NavBar>
        {chatMsgs.map(v => {
          console.log(v.from === targetId);


          return v.from === targetId ?
            <Item
              key={v._id}
              thumb={ `../img/${users[v.from].avatar}.png`}>
              {v.content}
            </Item> : <Item
              className='chat-me'
              key={v._id}
              extra={<img src= {`../img/${users[v.from].avatar}.png`}/>}
            >{v.content}</Item>
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v =>
                this.setState({text: v})}
              extra={
                <div>
                  <span
                    style={{marginRight: 25}}
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      });
                      this.fixCarousel();
                    }}
                  >😘</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>}
            />
          </List>
          {this.state.showEmoji ?
            <Grid
              data={emojis}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(e) => {
                this.setState({
                  text: this.state.text + e.text
                })
              }}
            /> : null
          }
        </div>
      </div>
    );
  }
}

export default Chat;
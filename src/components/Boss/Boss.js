import React from 'react';
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chat.user.redux'
import UserCard from '../../components/userCard/userCard'

@connect (
  state=> (state.chatUser),
  {getUserList}
)
class Boss extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount () {
    this.props.getUserList('genius');
  }
  render () {
    return (<UserCard userList={this.props.userList}/>);
  }
}

export default Boss;
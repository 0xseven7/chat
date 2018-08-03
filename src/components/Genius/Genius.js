import React from 'react';
import {getUserList} from '../../redux/chat.user.redux';
import UserCard from '../../components/userCard/userCard';
import {connect} from 'react-redux';


@connect(
  state => (state),
  {getUserList}
)

class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }
  render () {
    return (
      <UserCard userList={this.props.chatUser.userList}></UserCard>
    )
  }
}

export default Genius;
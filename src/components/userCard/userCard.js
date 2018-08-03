import React from 'react';
import PropTypes from 'prop-types';
import {Card, WingBlank} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  };



  handleClick (v) {
    this.props.history.push(`/chat/${v._id}`);
  }

  render () {
    return (
      <WingBlank>
        <div>

        {this.props.userList.map(v => (
          v.avatar ?
            (<Card
              key={v.user}
              onClick={() => this.handleClick(v)}>

              <Card.Header
                title={v.user}
                extra={<span>{v.position}</span>}
                thumb={require(`../img/${v.avatar}.png`)}/>
            <Card.Body>
              {v.desc.split('\n').map(d => (
                <div key={d}>{d}</div>
              ))}
              {v.type === 'boss' ?
                <div>
                  <p>公司: {v.compony}</p>
                  <p>薪资: {v.money}</p>
                </div> : null}
            </Card.Body>
          </Card>) : null
        ))}
        </div>
      </WingBlank>
    );
  }
}

export default UserCard;
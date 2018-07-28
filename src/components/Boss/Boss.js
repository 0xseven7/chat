import React from 'react';
import axios from 'axios';
import {Card, WingBlank} from 'antd-mobile';

class Boss extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    axios.get('/user/list?type=genuis').then(res => {
      if (res.data.code === 0) {
        this.setState({data: res.data.data});
      }
    });
  }

  render () {
    console.log(this.state);
    return (
      <WingBlank>
        {this.state.data.map((v) => (
          <Card key={v.user}>
            <Card.Header
              title={v.user}
              extra={<span>{v.user}</span>}
            >
            </Card.Header>
          </Card>
        ))}
      </WingBlank>
    )
  }
}

export default Boss;
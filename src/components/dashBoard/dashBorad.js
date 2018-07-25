import {React} from 'react';
import {TabBar, NavBar} from 'antd-mobile';
import {connect} from 'react-redux';


@connect(
  state => state
)
class Boss extends React.component {
  render () {
    return (
      <div>
       boss
      </div>
    );
  }
}

class DashBoard extends React.Component {
  render () {
    const user = this.props.user;
    const navList = [
      {
        path: '/boss',
        text: '极客',
        icon: 'boss',
        title: '极客列表',
        component: Boss,
        hide: user
      }
    ];
    return (
      <div>
        <h2>header</h2>
        <h2>footer</h2>
      </div>
    );
  }
}
import React from 'react';
import Logo from '../components/logo/logo';
// eslint-disable-next-line
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {login} from '../redux/user.redux';

@connect(
  state => ({user: state}),
  {login}
)
class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: '',
      psd: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  register () {
    this.props.history.push('/login');
  };

  handleChange (key, val) {
    this.setState(
      {
        [key]: val
      }
    );
  }

  handleLogin () {
    this.props.login(this.state);
  };

  /**
   *
   * @returns {*}
   */
  render () {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <Logo></Logo>
        <h2>登录页面</h2>
        <WingBlank>
          <List>
            <InputItem placeholder="请输入用户名" onChange={(v) => this.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace/>
            <InputItem placeholder="请输入密码" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>

        </WingBlank>
      </div>
    );
  }
}

export default Login;
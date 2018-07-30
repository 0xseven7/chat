import React from 'react';
import Logo from '../components/logo/logo';
// eslint-disable-next-line
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {login} from '../redux/user.redux';
import {Redirect} from 'react-router-dom';
import {getRedirectPath} from '../util';
// import './style.css'
@connect(
  state => (state.user),
  {login}
)
class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: '',
      pwd: ''
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
    console.log(this.props.redirectTo);
    return (
      <div>
        {this.props.redirectTo&& this.props.redirectTo !== '/login' ? <Redirect to={getRedirectPath(this.props.redirectTo)}/> : null}
        <Logo/>
        <h2>登录页面</h2>
        {this.props.msg ? <p className='message'>{this.props.msg}</p> : null}
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
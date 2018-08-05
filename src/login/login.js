import React from 'react';
import Logo from '../components/logo/logo';
// eslint-disable-next-line
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {login} from '../redux/user.redux';
import {Redirect} from 'react-router-dom';
import {getRedirectPath} from '../util';
import form from '../components/form/form';

// import './style.css'
@connect(
  state => (state.user),
  {login}
)
@form
class Login extends React.Component {
  constructor (props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }


  // handleChange (key, val) {
  //   this.setState(
  //     {
  //       [key]: val
  //     }
  //   );
  // }
  handleRegister () {
    this.props.history.push('/register');
  }
  handleLogin () {
    this.props.login(this.props.state);
  };

  /**
   *
   * @returns {*}
   */
  render () {
    return (
      <div>
        {this.props.redirectTo&& this.props.redirectTo !== '/login' ? <Redirect to={getRedirectPath(this.props.redirectTo)}/> : null}
        <Logo/>
        <h2>登录页面</h2>
        {this.props.msg ? <p className='message'>{this.props.msg}</p> : null}
        <WingBlank>
          <List>
            <InputItem placeholder="请输入用户名" onChange={(v) => this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace/>
            <InputItem placeholder="请输入密码" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>去注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
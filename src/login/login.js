import React from 'react';
import Logo from '../components/logo/logo';
// eslint-disable-next-line
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

class Register extends React.Component {
  constructor (props) {
    super(props);
    this.register = this.register.bind(this);
  }

  register () {
    this.props.history.push('/register');
  };

  render () {
    return (
      <div>
                <Logo></Logo>
                <h2>登录页面</h2>
                <WingBlank>
                    <List>
                        <InputItem placeholder="请输入用户名">用户</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder="请输入密码">密码</InputItem>
                    </List>
                    <Button type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
    );
  }
}

export default Register;
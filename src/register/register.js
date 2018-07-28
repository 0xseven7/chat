import React from 'react';
import Logo from '../components/logo/logo';
// eslint-disable-next-line  
import {InputItem, WhiteSpace, WingBlank, Button, List, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
  (state) => ({user: state}),
  {register}
)
class Register extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      type: 'genius', //或者boss,
      username: '',
      pwd: '',
      repeatPwd: ''
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  // login() {
  //
  // };
  handleChange (key, val) {
    this.setState({[key]: val});
  }

  handleRegister () {
    this.props.register(this.state);
  };

  render () {
    const RadioItem = Radio.RadioItem;
    console.log(this);
    return (
      <div>
        {this.props.user.redirectTo ? <Redirect  to={this.props.user.redirectTo} /> : null  }
        <Logo></Logo>
        {this.props.user.msg ? <div>{this.props.user.msg}</div> : null}
        <WingBlank>
          <List>
            <InputItem placeholder="请输入用户名" onChange={v => this.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace/>
            <InputItem type="password" placeholder="请输入密码" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
            <WhiteSpace/>
            <InputItem type="password" placeholder="确认密码" onChange={v => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem
              checked={this.state.type === 'genius'}
              onChange={() => this.handleChange('type', 'genius')}>
              牛人</RadioItem>
            <WhiteSpace/>
            <RadioItem
              onChange={() => this.handleChange('type', 'boss')}
              checked={this.state.type === 'boss'}
            >boss</RadioItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
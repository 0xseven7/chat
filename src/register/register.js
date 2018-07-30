import React from 'react';
import Logo from '../components/logo/logo';
// eslint-disable-next-line  
import {InputItem, WhiteSpace, WingBlank, Button, List, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../redux/user.redux';
import {Redirect} from 'react-router-dom';
import formDecoration from '../components/form/form';


@connect(
  (state) => (state.user),
  {register}
)
@formDecoration
class Register extends React.Component {
  constructor (props) {
    super(props);
    // 使用高阶组件
    // this.state = {
    //   type: 'genius', //或者boss,
    //   username: '',
    //   pwd: '',
    //   repeatPwd: ''
    // };
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount () {
    this.props.handleChange('type', 'genius')
  }
  // login() {
  //
  // };
  handleChange (key, val) {
    this.setState({[key]: val});
  }

  handleRegister () {
    this.props.register(this.props.state);
  };

  render () {
    const RadioItem = Radio.RadioItem;
    console.log(this);
    return (
      <div>
      {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
        {this.props.msg ? <div>{this.props.msg}</div> : null}
        <WingBlank>
          <List>
            <InputItem placeholder="请输入用户名" onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace/>
            <InputItem type="password" placeholder="请输入密码" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
            <WhiteSpace/>
            <InputItem type="password" placeholder="确认密码" onChange={v => this.props.handleChange('repeatPwd', v)}>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem
              checked={this.props.state.type === 'genius'}
              onChange={() => this.props.handleChange('type', 'genius')}>
              牛人</RadioItem>
            <WhiteSpace/>
            <RadioItem
              onChange={() => this.props.handleChange('type', 'boss')}
              checked={this.props.state.type === 'boss'}
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
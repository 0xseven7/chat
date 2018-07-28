import React from 'react';
import {NavBar, InputItem, WhiteSpace, TextareaItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import AvatarSelector from '../../components/AvatarSelector/AvatarSelector';
import {update} from '../../redux/user.redux';

@connect (
  state=>(state),
  {update}
)
class GeniusInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      position: '',
      money: '',
      desc: '',
      avatar: ''
    };
  }

  onChange (key, val) {
    this.setState({
      [key]: val
    });
  }

  render () {
    //currentPATH
    const pathname = this.props.location.pathname;
    const redirect =  this.props.redirectTo;
    return (
      <div>
        {redirect && redirect!== pathname ? <Redirect to={redirect} />: null}
        <NavBar mode="dark">完善信息</NavBar>
        <AvatarSelector selectAvatar={imgName => {
          this.setState({avatar: imgName});
        }}/>
          <InputItem onChange={v => this.onChange('position', v)}>期待岗位</InputItem>
            <WhiteSpace/>
          <InputItem onChange={v => this.onChange('money', v)}>期待薪资</InputItem>
            <WhiteSpace/>
            <WhiteSpace/>
          <TextareaItem
            onChange={v => this.onChange('desc', v)}
            title="个人简介"
            row={3}
            autoHeight/>
        <Button onClick={() => {
          this.props.update(this.state)
        }} type="primary">保存</Button>
      </div>
    );
  }
}

export default GeniusInfo;

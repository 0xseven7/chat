import React from 'react';
import {Grid, List, Button} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      icon: '',
      text: ''
    };
  }

  static propTypes = {
    selectAvatar: PropTypes.func
  };

  render () {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map((v) => ({
        icon: require(`../img/${v}.png`),
        text: v
      }));
    const gridHeader = this.state.text ? (<div>
                                            <span>已选择头像</span>
                                            <img src={this.state.icon} alt="" style={{width: 20}}/>
                                          </div>) : '请选择头像';
    return (
      <div>
        <List renderHeader={() => gridHeader}>
        <Grid data={avatarList} columnNum={5} onClick={(elm) => {
          this.setState(elm);
          this.props.selectAvatar(elm.text);
        }}/>
        </List>
      </div>
    );
  }
}

export default AvatarSelector;
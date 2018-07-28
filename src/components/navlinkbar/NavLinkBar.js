import React from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';

import {withRouter} from 'react-router-dom';
import './fonts/iconfont.css';
@withRouter
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render () {
    const navList = this.props.data.filter(v => !v.hide);
    const TabBarItem = TabBar.Item;
    const {pathname}= this.props.location;
    return (
      <TabBar className='tab-bar'>
        {navList.map(v => (
          <TabBarItem
            title={v.title}
            key={v.path}
            icon={<i className={`am-icon am-icon-${v.icon}`}></i>}
            selectedIcon={<i className={`am-icon am-icon-${v.icon}`}></i>}
            selected = {pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path);
            }}
          >
          </TabBarItem>
        ))}
      </TabBar>
    );

  }
}

export default NavLinkBar;

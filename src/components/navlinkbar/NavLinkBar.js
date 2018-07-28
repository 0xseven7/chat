import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {TabBar, Icon} from 'antd-mobile'

import './fonts/iconfont/iconfont.css'
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  render () {
    const navList = this.props.data.filter(v => !v.hide);
    console.log(navList);
    const TabBarItem = TabBar.Item;
    return (
        <TabBar>
          {/*{navList.map(v => (*/}
            {/*<TabBarItem title={v.title} icon={<Icon type={v.icon}></Icon>}></TabBarItem>*/}
          {/*))}*/}
          <i className='iconfont icon-me'></i>
        </TabBar>
    )

  }
}
export default NavLinkBar;

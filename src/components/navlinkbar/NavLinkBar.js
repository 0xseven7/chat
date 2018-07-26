import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {TabBar} from 'antd-mobile'

class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  render () {
    const navList = this.props.data.filter(v => !v.hide);
    console.log(navList);
    const TabBarItem = TabBar.item;
    return (
      <TabBar
        {navList.map( v => (
          <TabBarItem title={v.title} key={v.path} icon={v.}/>
        ))}
      />
    )
  }
}

export default NavLinkBar;

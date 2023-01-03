import React from 'react';
import { Menu } from 'antd';

const items = [
  {
    label: <a href="/">Home</a>,
    key: 'mail',
  },
  {
    label: <a href="/favorite">Favorite</a>,
    key: 'favorite',
  }
]
function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu
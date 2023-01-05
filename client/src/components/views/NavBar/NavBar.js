import React, { useState } from 'react';
import Menu from './Sections/Menu';
import { Drawer, Button } from 'antd';
import Icon from '@ant-design/icons';
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  return (
    <nav className="menu" style={{ zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div>
        <Menu />
      </div>
    </nav>
  )
}

export default NavBar

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { LoginOutlined, LogoutOutlined, StarOutlined, UserAddOutlined } from '@ant-design/icons';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };
  
  const logout = [
    {
      label: <a href="/">Home</a>,
    },
    {
      label: <a href="/login">Signin</a>,
      key: "mail",
      icon: <LoginOutlined/>
    },
    {
      label:<a href="/register">Signup</a>,
      icon: <UserAddOutlined />
    }
  ]

  const login = [
    {
      label: <a href="/">Home</a>,
    },
    {
      label: <a href="/favorite">Favorite</a>,
      icon: <StarOutlined/>
    },
    {
      label: <a href={`/review`}>Review</a>,
    },
    {
      label: <a onClick={logoutHandler}>Logout</a>,
      icon: <LogoutOutlined />
    }
  ]

  
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode="horizontal" items={logout} />
    )
  } else {
    return (
      <Menu mode="horizontal" items={login} />
    )
  }
}

export default withRouter(RightMenu);
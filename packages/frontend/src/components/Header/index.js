import { AppBar, Button, Toolbar } from '@material-ui/core';
import { AccountCircle, Dashboard, ExitToApp, Home } from '@material-ui/icons';
import React from 'react';
import api from '../../services/api';
import './style.css';

function Header() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('jwt');

  async function logout() {
    const response = await api.put(`/logout`);
    window.location.href = '/';
  }

  return (
    <AppBar position="static" className="header">
      <Toolbar
        style={{
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        align="center"
      >
        <Button>
          <Home />
        </Button>
        <Button
          style={{ minWidth: '20px', maxWidth: 'fit-content', padding: '20px' }}
        >
          <Dashboard style={{ marginRight: '5px' }} />
          <strong>TrelloClone</strong>
        </Button>
        <div style={{ display: 'flex' }}>
          <div style={{ margin: 'auto', display: 'flex' }}>
            <AccountCircle />
            <span style={{ margin: 'auto', marginLeft: 10 }}>
              {JSON.parse(sessionStorage.user).username}
            </span>
          </div>

          <Button onClick={() => logout()}>
            <ExitToApp />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

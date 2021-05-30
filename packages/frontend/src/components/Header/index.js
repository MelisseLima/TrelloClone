import {
  AppBar,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
} from '@material-ui/core';
import { AccountCircle, Dashboard, Home } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import api from '../../services/api';
import './style.css';

function Header() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('jwt');
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  async function logout() {
    const response = await api.put(`/logout`);
    handleClose();
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
        <div>
          <Button>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              {user.name}
              <AccountCircle style={{ marginLeft: 10 }} />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={() => logout()}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

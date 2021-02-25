import React from "react";
import { Dashboard, AppsOutlined, HomeOutlined } from "@material-ui/icons";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";

import "./style.css";

function Header() {
  return (
    <AppBar position="static" className="header">
      <Toolbar
        style={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
        align="center"
      >
        <Button style={{ minWidth: "20px", maxWidth: "fit-content", padding: '20px' }}>
          <Dashboard style={{ marginRight: "5px" }} />
          <strong>TrelloClone</strong>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

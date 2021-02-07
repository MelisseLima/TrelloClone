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
          paddingTop : 10
        }}
        align="center"
      >
        <div style={{ position: "absolute", marginTop: "10px" }}>
          <IconButton
            edge="start"
            className="Icon"
            color="inherit"
            aria-label="menu"
          ></IconButton>
        </div>
        <Button style={{ minWidth: "20px", maxWidth: "fit-content" }}>
          <Dashboard style={{ marginRight: "5px" }} />
          <strong>TrelloClone</strong>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

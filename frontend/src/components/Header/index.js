import React from "react";
import { Dashboard, AppsOutlined, HomeOutlined } from "@material-ui/icons";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";

import "./style.css";

function Header() {
  return (
    <AppBar position="static" className="header" style={{}}>
      <Toolbar
        style={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "grid",
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
          <Button>
            <AppsOutlined />
          </Button>
          <Button>
            <HomeOutlined />
          </Button>
          <Button>
            <Dashboard style={{ marginRight: "5px" }} />
            Quadros
          </Button>
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

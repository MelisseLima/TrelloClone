import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core/";
import { MoreHoriz } from "@material-ui/icons/";

import api from "./../../services/api";

function TaskCard({ description, id }) {
  const [stillExists, setStillExist] = useState(true);
  const [newDescription, setNewDescription] = useState(description);
  const [showInputDescription, setShowInputDescription] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleDelete() {
    try {
      const data = { id };
      const response = await api.post("tasks", data);
      setStillExist(false);
    } catch (err) {
      alert("Error ao deletar por favor tente novamente.");
    }
  }

  async function handlePressDownEdit(e) {
    try {
      if (e.key === "Enter") {
        const data = { id, description };
        const response = await api.post("tasks", data);
        setStillExist(false);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      {stillExists && (
        <Card
          style={{
            backgroundColor: "#fff",
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "8px",
            display: "flex",
          }}
        >
          {!showInputDescription && (
            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <Typography
                style={{
                  margin: "10px",
                  fontSize: "13px",
                  width: "90%",
                }}
              >
                {description}
              </Typography>

              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ float: "right", position: "sticky" }}
              >
                <MoreHoriz />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => setNewDescription(false)}>
                  Editar
                </MenuItem>
                <MenuItem onClick={() => handleDelete()}>Deletar</MenuItem>
              </Menu>
            </div>
          )}

          {showInputDescription && (
            <TextField
              label="Descrição"
              style={{ height: "1em" }}
              onChange={(e) => setNewDescription(e.target.value)}
              onKeyDown={(e) => handlePressDownEdit(e)}
              value={newDescription}
              style={{
                margin: "10px",
                width: "-webkit-fill-available",
                color: "#fff",
              }}
              variant="outlined"
            />
          )}
        </Card>
      )}
    </div>
  );
}

export default TaskCard;

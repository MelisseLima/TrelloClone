import { Button, CircularProgress, Dialog, TextField } from "@material-ui/core";
import React, { useState } from "react";
import api from "../../services/api";

function CreateList({ open, handleClose, board_id, addList }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  async function createList() {
    setLoading(true);
    const response = await api
      .post(
        `/list`,
        {
          name: name,
          board_id: board_id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        const list = response.data.data[0];
        addList(list);
      });
    setLoading(false);
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <div
        style={{
          width: 400,
          height: 300,
          color: "#000",
          margin: 20,
          display: "grid",
        }}
      >
        <h2>Criar coluna</h2>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={createList}
          style={{ height: "fit-content" }}
        >
          {!loading ? (
            "Criar"
          ) : (
            <CircularProgress
              style={{ color: "#fff", width: 20, height: 20 }}
            />
          )}
        </Button>
      </div>
    </Dialog>
  );
}

export default CreateList;

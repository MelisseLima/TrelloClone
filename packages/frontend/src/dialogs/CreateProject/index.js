import { Button, CircularProgress, Dialog, TextField } from "@material-ui/core";
import React, { useState } from "react";
import api from "../../services/api";

function CreateProject({ open, handleClose }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function createBoard() {
    setLoading(true);
    const response = await api.post(
      `/board`,
      {
        name: name,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
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
        <h2>Criar Projeto</h2>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          label="Description"
          multiline
          rows={2}
          variant="outlined"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Button variant="contained" color="primary" onClick={createBoard}>
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

export default CreateProject;

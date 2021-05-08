import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { CardList } from "../CardList/index";
import "./style.css";

function Board() {
  const [lists, setLists] = useState([]);
  const [newInsertion, setNewInsertion] = useState(false);
  const [newInsertionLabel, setNewInsertionLabel] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    async function loadLists() {
      const response = await api.get(`/lists`, {});

      setLists(response.data);
      setNewInsertion(false);
    }

    loadLists();
  }, [newInsertion]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const data = { label: newInsertionLabel };

      try {
        await api.post("list", data);
        setNewInsertion(true);
      } catch (err) {
        toast.error("Error ao criar lista, tente novamente.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      setNewInsertionLabel("");
      setShowInput(false);
    }
  };

  return (
    <div
      className="container"
      style={{ overflowY: "scroll", height: "90%", overflow: "auto" }}
    >
      {lists.map((list) => (
        <CardList label={list.label} key={list.id} id={list.id} />
      ))}
      <Card
        className="list"
        style={{
          backgroundColor: "#dfe6e9",
          borderRadius: "3px",
          marginLeft: "5px",
          marginRight: "5px",
          marginTop: "10px",
          textAlign: "left",
        }}
      >
        {!showInput && (
          <div>
            <Button
              style={{ width: "100%" }}
              onClick={() => setShowInput(true)}
            >
              <Add />
              Adicionar lista
            </Button>
          </div>
        )}
        {showInput && (
          <div style={{ margin: "15px", width: "auto" }}>
            <TextField
              label="Título"
              variant="outlined"
              onChange={(e) => setNewInsertionLabel(e.target.value)}
              value={newInsertionLabel}
              style={{ width: "100%" }}
              onKeyDown={handleKeyDown}
            />
            <Typography style={{ fontSize: "12px", width: "100%" }}>
              Pressione Enter para adicionar.
            </Typography>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Board;

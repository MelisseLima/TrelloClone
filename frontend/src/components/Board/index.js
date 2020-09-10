import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { CardList } from "../CardList/index";

import { Card, Typography, TextField } from "@material-ui/core/";

import "./style.css";

function Board() {
  const [lists, setLists] = useState([]);
  const [label, setLabel] = useState("");
  const [newInsertion, setNewInsertion] = useState(false);

  useEffect(() => {
    async function loadLists() {
      const response = await api.get(`/`, {});

      setLists(response.data);
      setNewInsertion(false);
    }

    loadLists();
  }, [newInsertion]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const data = { label };

      try {
        const response = await api.post("list", data);
        setNewInsertion(true);
      } catch (err) {
        alert("Error ao criar lista, tente novamente.");
      }
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
        <input
          id="outlined-basic"
          label="Título"
          variant="Outlined"
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            margin: "10px",
            width: "-webkit-fill-available",
            color: "#fff",
          }}
        />
        <a align="center" style={{ display: "flex", margin: "5px" }}>
          <Typography style={{ fontSize: "14px", margin: "5px" }}>
            Pressione Enter para criar novo cartão.
          </Typography>
        </a>
      </Card>
    </div>
  );
}

export default Board;

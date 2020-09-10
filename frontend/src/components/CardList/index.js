import React, { useState, useEffect } from "react";
import api from "../../services/api";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@material-ui/core/";
import { Edit, Delete } from "@material-ui/icons";
import TaskCard from "../TaskCard/index";

import "./styles.css";

function CardList({ label, id }) {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [newInsertion, setNewInsertion] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      const response = await api.get(`/task`, { params: { list_id: id } });

      setTasks(response.data);
      setNewInsertion(false);
    }

    loadTasks();
  }, [newInsertion]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const data = { description, list_id: id };

      try {
        const response = await api.post("task", data);
        setNewInsertion(true);
      } catch (err) {
        alert("Error ao criar tarefa, tente novamente.");
      }
    }
  };

  async function handleDelete() {
    try {
      const response = await api.delete("list", { body: { id: id } });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
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
      <CardContent style={{ display: "flex" }}>
        <Typography
          style={{ width: "50%" }}
          variant="h6"
          component="h3"
          className="title"
        >
          {label}
        </Typography>
        <div align="right" style={{ width: "50%", fontSize: "10px" }}>
          <Button aria-controls="simple-menu" aria-haspopup="true">
            <Edit aling="right" />
          </Button>
          <Button
            aria-controls="simple-menu"
            onClick={(e) => handleDelete()}
            aria-haspopup="true"
          >
            <Delete aling="right" />
          </Button>
        </div>
      </CardContent>

      {tasks.map((task) => (
        <TaskCard description={task.description} />
      ))}

      <div>
        <TextField
          id="filled-basic"
          label="Tarefa"
          variant="filled"
          onChange={(e) => setDescription(e.target.value)}
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
      </div>
    </Card>
  );
}

export { CardList };

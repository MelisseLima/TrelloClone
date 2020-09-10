import React, { useState, useEffect } from "react";
import api from "../../services/api";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@material-ui/core/";
import { Edit, Delete, Add } from "@material-ui/icons";
import TaskCard from "../TaskCard/index";
import axios from "axios";

import "./styles.css";

function CardList({ label, id }) {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [newLabel, setLabel] = useState(label);
  const [newInsertion, setNewInsertion] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showEditLabel, setShowEditLabel] = useState(false);
  const [stillExists, setStillExist] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      const response = await api.get(`/task`, { params: { list_id: id } });
      setTasks(response.data);
      setDescription("");
      setShowInput(false);
      setNewInsertion(false);
    }

    loadTasks();
  }, [newInsertion]);

  const handleKeyDown = async (e) => {
    try {
      if (e.key === "Enter") {
        const data = { description, list_id: id };
        const response = await api.post("task", data);
        setNewInsertion(true);
      }
    } catch (err) {
      alert("Error ao criar tarefa, tente novamente.");
    }
  };

  const handleKeyDownLabel = async (e) => {
    try {
      const data = { id, label: newLabel };
      if (e.key === "Enter") {
        const response = await api.post("editList", data);
        setShowEditLabel(false);
      }
    } catch (err) {
      setLabel(label);
      alert(err);
    }
  };

  async function handleDelete() {
    try {
      const data = { id };
      const response = await api.post("lists", data);
      setStillExist(false);
    } catch (err) {
      alert("Error deleting list. Please, try again...");
    }
  }

  return (
    <div>
      {stillExists && (
        <Card
          key={id}
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
            {!showEditLabel && (
              <Typography
                style={{ width: "50%" }}
                variant="h6"
                component="h3"
                className="title"
              >
                {newLabel}
              </Typography>
            )}
            {showEditLabel && (
              <TextField
                label="Título"
                style={{ height: "1em" }}
                onChange={(e) => setLabel(e.target.value)}
                onKeyDown={handleKeyDownLabel}
                value={newLabel}
                style={{
                  margin: "10px",
                  width: "-webkit-fill-available",
                  color: "#fff",
                }}
              />
            )}
            <div align="right" style={{ width: "50%", fontSize: "10px" }}>
              <Button
                aria-controls="simple-menu"
                onClick={() => setShowEditLabel(true)}
                aria-haspopup="true"
              >
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
            <TaskCard
              key={task.id}
              id={task.id}
              description={task.description}
            />
          ))}

          {showInput && (
            <div>
              <TextField
                label="Tarefa"
                variant="outlined"
                style={{ height: "2em" }}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                value={description}
                multiline
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
          )}
          {!showInput && (
            <Button
              onClick={() => setShowInput(true)}
              style={{ margin: "10px" }}
            >
              <Add />
              Adicionar Tarefa
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}

export { CardList };

import { Button } from "@material-ui/core";
import { Add, Create, PlaylistAdd } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import CreateList from "../../dialogs/CreateList";
import TaskCard from "../../dialogs/TaskCard";
import api from "../../services/api";
import CardList from "./../CardList";
import "./style.css";

function ProjectViewer({ id }) {
  const [board, setBoard] = useState({});
  const [lists, setLists] = useState([]);
  const [openCreateList, setOpenCreateList] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadLists() {
      const response = await api.get(`/board/${id}`);
      setBoard(response.data.data);
      setLists(response.data.data.lists);
    }

    loadLists();
  }, []);

  return (
    <div>
      <div
        className={"header-project"}
        style={{
          color: "#fff",
          textAlign: "left",
          paddingLeft: 20,
          paddingRight: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <h2>{board.name}</h2>
          <Button>
            <Create />
          </Button>
        </div>

        <div style={{ display: "flex" }}>
          <Button onClick={() => setOpenTask(true)}>
            <PlaylistAdd />
            Criar tarefa
          </Button>
          <Button onClick={() => setOpenCreateList(true)}>
            <Add />
            Criar coluna
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          marginLeft: 10,
        }}
      >
        {!loading &&
          lists.map((item) => {
            return <CardList item={item} />;
          })}
      </div>

      <CreateList
        open={openCreateList}
        handleClose={() => setOpenCreateList(false)}
        board_id={board.id}
        addList={(item) => {
          setLists((oldLists) => [...oldLists, item]);
        }}
      />
      <TaskCard open={openTask} handleClose={() => setOpenTask(false)} />
    </div>
  );
}

export default ProjectViewer;

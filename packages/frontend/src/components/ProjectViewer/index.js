import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import CreateList from "../../dialogs/CreateList";
import api from "../../services/api";
import "./style.css";

function ProjectViewer({ id }) {
  const [board, setBoard] = useState({});
  const [lists, setLists] = useState([]);
  const [openCreateList, setOpenCreateList] = useState(false);
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
        }}
      >
        <h2>{board.name}</h2>
      </div>
      <div style={{ display: "flex" }}>
        {!loading &&
          lists.map((item) => {
            return (
              <div className={"list"}>
                <h4>{item.label}</h4>
              </div>
            );
          })}
      </div>
      <Fab
        style={{ position: "absolute", right: 10, bottom: 10 }}
        color="primary"
        onClick={() => setOpenCreateList(true)}
      >
        <Add />
      </Fab>
      <CreateList
        open={openCreateList}
        handleClose={() => setOpenCreateList(false)}
        board_id={board.id}
      />
    </div>
  );
}

export default ProjectViewer;

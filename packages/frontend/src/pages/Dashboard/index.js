import { Button, Card, CircularProgress, Grid } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "./../../components/Header";
import CreateProject from "./../../dialogs/CreateProject";
import "./style.css";

function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddBoard, setOpenAddBoard] = useState(false);

  useEffect(() => {
    async function getBoards() {
      setLoading(true);
      const response = await api.get(`/boards`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      setBoards(response.data.data);
      setLoading(false);
    }
    getBoards();
  }, []);

  function goBoard(id) {
    window.location.href = `/board/${id}`;
    console.log(id);
  }

  return (
    <>
      <Header />
      <div style={{ margin: 40 }}>
        <div className="header-boards">
          <h2>Meus Projetos</h2>
          <Button onClick={() => setOpenAddBoard(true)}>
            <Add />
            Criar novo projeto
          </Button>
        </div>
        <Grid container>
          {loading && <CircularProgress />}
          {!loading &&
            boards.map((item) => {
              return (
                <Card
                  className={"card-board"}
                  onClick={() => {
                    goBoard(item.id);
                  }}
                >
                  <h3>{item.name}</h3>
                  <p>{item.description || ""}</p>
                </Card>
              );
            })}
        </Grid>
      </div>
      <CreateProject
        open={openAddBoard}
        handleClose={() => setOpenAddBoard(false)}
      />
    </>
  );
}

export default Dashboard;

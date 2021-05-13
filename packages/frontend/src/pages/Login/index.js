import { Button, Card, CircularProgress, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function login() {
    setLoading(true);
    const response = await api
      .post(`/login`, { username, password })
      .then((resp) => {
        return resp;
      })
      .catch((e) => {
        enqueueSnackbar(
          "Não foi possivel realizar login, verifique os dados e tente novamente.",
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      });
    console.log(response);
    sessionStorage.setItem("jwt", response.data.token);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    setLoading(false);
    window.location.href = "/home";
  }

  return (
    <div style={{ display: "inline-grid" }}>
      <Card
        style={{
          width: 400,
          height: 400,
          display: "inline-grid",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        <div style={{ padding: 20, display: "inline-grid", width: 360 }}>
          <h3 style={{ width: "inherit" }}>Login</h3>
          <TextField
            style={{ width: "inherit" }}
            label={"Username"}
            variant={"outlined"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            style={{ width: "inherit" }}
            label={"Password"}
            variant={"outlined"}
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/register">Criar conta</Link>

          <Button
            style={{ height: "max-content", padding: 10 }}
            variant="contained"
            color="primary"
            onClick={login}
          >
            {!loading ? (
              "Entrar"
            ) : (
              <CircularProgress
                style={{ color: "#fff", width: 20, height: 20 }}
              />
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Login;

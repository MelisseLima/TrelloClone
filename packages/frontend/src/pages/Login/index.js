import { Button, Card, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const response = await api.post(`/login`, { username, password });
    sessionStorage.setItem("jwt", response.data.token);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    window.location.href = "/home";
  }

  return (
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
          Entrar
        </Button>
      </div>
    </Card>
  );
}

export default Login;

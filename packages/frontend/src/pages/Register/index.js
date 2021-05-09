import { Button, Card, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const response = await api.post(`/register`, {
      username,
      password,
      name,
      email,
    });
  }

  return (
    <Card
      style={{
        width: 400,
        height: 500,
        display: "inline-grid",
        justifyContent: "space-between",
        marginTop: 50,
      }}
    >
      <div style={{ padding: 20, display: "inline-grid", width: 360 }}>
        <h3 style={{ width: "inherit" }}>Sign Up</h3>
        <TextField
          style={{ width: "inherit" }}
          label={"Name"}
          variant={"outlined"}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          style={{ width: "inherit" }}
          label={"Username"}
          variant={"outlined"}
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          style={{ width: "inherit" }}
          label={"Email"}
          variant={"outlined"}
          value={email}
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          style={{ width: "inherit" }}
          label={"Password"}
          variant={"outlined"}
          value={password}
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/">Já possuo conta</Link>
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

export default Register;

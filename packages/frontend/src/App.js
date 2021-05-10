import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Board from "./pages/Board";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/home">
        <Dashboard />
      </Route>
      <Route exact path="/board/:id">
        <Board />
      </Route>
    </div>
  );
}
export default App;

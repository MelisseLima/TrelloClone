import React, { useEffect, useState } from "react";
import Board from "./../../components/Board";
import Header from "./../../components/Header";

function Dashboard() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (sessionStorage.getItem("jwt")) {
      setToken(token);
      setUser(user);
    }
  }, []);
  return (
    <>
      <Header />
      <Board />
    </>
  );
}

export default Dashboard;

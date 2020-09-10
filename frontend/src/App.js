import React from "react";
import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Header />
      <main style={{ height: "100%" }}>
        <Board styles={{ width: "100%" }} />
      </main>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import ListsCard from "./components/ListsCard";
import Header from "./components/Header";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Header />
      <main style={{ height: "100%" }}>
        <ListsCard styles={{ width: "100%" }} />
      </main>
    </div>
  );
}

export default App;

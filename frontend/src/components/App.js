import React, { Component, useState } from "react";
import TrelloList from "./TrelloList/index";
import { connect } from "react-redux";

class App extends Component {
  render() {
    const [lists, setLists] = useState([
      {
        title: "Last Episode",
        id: 0,
        cards: [
          {
            id: 0,
            description: "Test Reducer",
          },
          {
            id: 1,
            description: "Test Reducer 2",
          },
        ],
      },
    ]);

    return (
      <div className="App">
        <h2>Hello Youtube</h2>
        {lists.map(() => (
          <TrelloList label={list.label} cards={list.cards} />
        ))}
      </div>
    );
  }
}

export default App;

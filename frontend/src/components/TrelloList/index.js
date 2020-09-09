import React from "react";
import TrelloCard from "../TrelloCard";

function TrelloList({ label, cards }) {
  return (
    <div style={styles.container}>
      <h4>Hello</h4>
      <TrelloCard description="to action"></TrelloCard>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#ccc",
    borderRadius: 3,
    width: "300px",
    padding: "5px",
  },
};

export default TrelloList;

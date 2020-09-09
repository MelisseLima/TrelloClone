import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

function TrelloCard({ description }) {
  return (
    <Card style={styles.card}>
      <Typography className={styles.title} color="textSecondary" gutterBottom>
        {description}
      </Typography>
    </Card>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: 3,
    margin: "2px",
    padding: "2px",
  },
};

export default TrelloCard;

import React from "react";
import { Card, Typography } from "@material-ui/core/";

function TaskCard({ description }) {
  return (
    <Card
      style={{
        backgroundColor: "#fff",
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "8px",
      }}
    >
      <Typography
        style={{
          margin: "10px",
          fontSize: "13px",
        }}
      >
        {description}
      </Typography>
    </Card>
  );
}

export default TaskCard;

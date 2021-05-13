import { Button } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import React from "react";
import "./styles.css";

function CardList({ item }) {
  return (
    <div className={"list"}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "inherit",
          height: "fit-content",
        }}
      >
        <h4 style={{ marginTop: 8 }}>{item.label}</h4>
        <Button
          style={{
            width: "min-content",
            height: "min-content",
            color: "#555",
          }}
        >
          <MoreHoriz />
        </Button>
      </div>
    </div>
  );
}

export default CardList;

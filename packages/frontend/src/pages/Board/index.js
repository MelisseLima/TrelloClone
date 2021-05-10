import React from "react";
import { useParams } from "react-router-dom";
import ProjectViewer from "../../components/ProjectViewer";
import Header from "./../../components/Header";

function Board() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <ProjectViewer id={id} />
    </>
  );
}

export default Board;

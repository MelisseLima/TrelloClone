import React from "react";
import { useParams } from "react-router-dom";
import ProjectViewer from "../../components/ProjectViewer/index";
import Header from "./../../components/Header/index";

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

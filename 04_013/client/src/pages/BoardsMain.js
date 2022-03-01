import React from "react";
import BoardsList from "./BoardList";
import { withRouter } from "react-router-dom";

const BoardsMain = (props) => {
  return (
    <>
      <h2 align="center">게시판</h2>
      <BoardsList />
    </>
  );
};

export default BoardsMain;

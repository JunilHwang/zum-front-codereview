import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import BoardsMain from "../pages/BoardsMain";
import { Component } from "react/cjs/react.production.min";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Zum Test</h1>
        <BoardsMain />
      </div>
    );
  }
}

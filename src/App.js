import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import "./App.css";
import { Router, Link, Redirect } from "@reach/router";
import { Home } from "./home";
import { Game } from "./game";

const socket = openSocket("http://localhost:3000");

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" socket={socket}></Home>
        <Game path="game/:id" socket={socket}></Game>
      </Router>
    </div>
  );
}

export default App;

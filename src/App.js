import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
// import "./App.css";
import { Router, Link, Redirect } from "@reach/router";
import { Home } from "./home";
import { Game } from "./game";
import { Status } from "./status";

function App() {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    setSocket(openSocket("http://localhost:3000"));
  }, []);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setSocketConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      setSocketConnected(socket.connected);
    });
  }, [socket]);

  // manage socket connection
  const handleSocketConnection = () => {
    if (socketConnected) socket.disconnect();
    else {
      socket.connect();
    }
  };

  return (
    <div className="App">
      <Router>
        <Home path="/" socket={socket}></Home>
        <Game path="game/:id" socket={socket}></Game>
      </Router>
      <hr />
      <Status
        handleSocketConnection={handleSocketConnection}
        socketConnected={socketConnected}
      />
    </div>
  );
}

export default App;

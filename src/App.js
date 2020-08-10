import React, { useEffect, useState } from "react";
import { Router, Link, Redirect } from "@reach/router";
import { Home } from "./home";
import { Game } from "./game/Game";
import { Logger } from "./Logger";

const baseUrl = process.env.REACT_APP_BASE_URL;

function App() {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [gameCode, setGameCode] = useState(null);
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <pre>
        <code>
          Jugador -{">"} {sessionStorage.getItem("userId")}
        </code>
      </pre>
      <Router>
        <Home
          path="/"
          setSocket={setSocket}
          setUser={setUser}
          user={user}
          setGameCode={setGameCode}
          gameCode={gameCode}
          setUsername={setUsername}
          username={username}
          baseUrl={baseUrl}
        ></Home>
        <Game
          gameCode={gameCode}
          path="game/:id"
          socket={socket}
          user={user}
          setSocket={setSocket}
          username={username}
          avatarId={null || 0}
        ></Game>
      </Router>
      <hr />
      <Logger />
      <hr />
    </div>
  );
}

export default App;

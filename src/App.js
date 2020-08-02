import React, { useEffect, useState } from "react";
import { Router, Link, Redirect } from "@reach/router";
import { Home } from "./home";
import { Game } from "./game";
import { Logger } from "./Logger";

const baseUrl = process.env.REACT_APP_BASE_URL;

function App() {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [gameCode, setGameCode] = useState(null);

  return (
    <div className="App">
      <Router>
        <Home
          path="/"
          setSocket={setSocket}
          setUser={setUser}
          user={user}
          setGameCode={setGameCode}
          gameCode={gameCode}
          baseUrl={baseUrl}
        ></Home>
        <Game
          gameCode={gameCode}
          path="game/:id"
          socket={socket}
          user={user}
          setSocket={setSocket}
        ></Game>
      </Router>
      <hr />
      <Logger />
      <hr />
      <pre>
        <code>
          userId -{">"} {sessionStorage.getItem("userId")}
        </code>
      </pre>
    </div>
  );
}

export default App;

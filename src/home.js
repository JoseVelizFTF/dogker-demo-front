import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

export const Home = ({ socket }) => {
  const [roomCode, setRoomCode] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [username, setUsername] = useState("");

  function startGame() {
    console.log("Hello");
    navigate(`/game/${roomCode}`, { state: { roomCode } });
    socket.emit("startGame", roomCode);
  }

  useEffect(() => {
    setUsername(prompt("Ingresa tu nombre:"));
    socket.emit("createGame");
    socket.on("createGame", (data) => setRoomCode(data));
    socket.on("sendRoomsToClient", (data) => console.log(data));
  }, []);

  return (
    <div>
      <div>Hola {`${username}`}</div>
      El codigo de tu sala de juego es: {roomCode}
      <div>
        <button onClick={startGame}>Comenzar</button>
      </div>
    </div>
  );
};

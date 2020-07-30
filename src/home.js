import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { v4 as uuidv4 } from "uuid";

export const Home = ({ socket }) => {
  const initialRoomCode = uuidv4().substring(0, 6);
  const [roomCode, setRoomCode] = useState(initialRoomCode);
  const [gameState, setGameState] = useState(null);
  const [username, setUsername] = useState("");

  function createOrJoinRoom() {
    navigate(`/game/${roomCode}`, { state: { roomCode } });
    socket.emit("createOrJoinRoom", roomCode);
  }

  useEffect(() => {}, []);

  return (
    <div>
      <div>
        <span>Ingresa tu nombre:</span>
        <input onChange={(e) => setUsername(e.target.value)} />
      </div>
      <br />
      <div>
        <span>Sala de juego:</span>
        <input
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder={roomCode}
        />
      </div>
      <br />
      <div>
        <button onClick={createOrJoinRoom}>Entrar a la mesa</button>
      </div>
    </div>
  );
};

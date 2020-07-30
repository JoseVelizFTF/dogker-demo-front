import React, { useState, useEffect } from "react";

export const Game = ({ location, socket }) => {
  const [room, setRoom] = useState(null);
  const userId = socket ? socket.io.engine.id : null;
  console.log("userId", userId);
  function startGame() {
    console.log("Game starting...");
  }
  useEffect(() => {
    socket &&
      socket.on("joinedRoom", ({ room }) => {
        console.log("call joinedRoom", room);
        setRoom(room);
      });
  }, []);

  return (
    <div>
      <div path="/game/:id">Juego: {location.state.roomCode}</div>
      <div>
        {room !== null && room.owner === userId ? (
          <button onClick={startGame}>Iniciar juego</button>
        ) : (
          <span>
            Esperar a que el host inicie la partida o se conecten más de 2
            jugadores
          </span>
        )}
      </div>
      <pre>
        <div>
          Room -{">"} <code>{JSON.stringify(room, null, 2)}</code>
        </div>
        <div>{`userId -> ${userId}`}</div>
      </pre>
    </div>
  );
};

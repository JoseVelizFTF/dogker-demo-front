import React, { useState, useEffect } from "react";
import { createSocket, getSocket } from "./api/socket";
import { navigate } from "@reach/router";

export const Game = ({ location, socket, setSocket, gameCode, user }) => {
  const [room, setRoom] = useState(null);

  function startGame() {
    socket.emit("startGame", { gameCode });
  }

  function prepareSocket() {
    createSocket();
    const socket = getSocket();
    setSocket(socket);
    return socket;
  }

  useEffect(() => {
    const socket = prepareSocket();

    // socket.on("err", () => {
    //   navigate("/");
    // });
    socket.emit("createOrJoinRoom", {
      userId: sessionStorage.getItem("userId"),
      gameCode: location.state.gameCode,
    });
  }, []);

  useEffect(() => {
    socket &&
      socket.on("joinedRoom", (gameCode) => {
        console.log("call joinedRoom", gameCode);
        setRoom(gameCode);
      });
  }, [socket]);

  return (
    <div>
      <div path="/game/:id">Juego: {location.state.gameCode}</div>
      <div>
        {room !== null && room.owner === sessionStorage.getItem("userId") ? (
          <button onClick={startGame}>Iniciar juego</button>
        ) : (
          <span>Esperar a que el host inicie la partida</span>
        )}
      </div>
      <pre>
        <div>
          Room -{">"} <code>{JSON.stringify(room, null, 2)}</code>
        </div>
      </pre>
    </div>
  );
};

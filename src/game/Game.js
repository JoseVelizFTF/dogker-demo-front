import React, { useState, useEffect } from "react";
import { createSocket, getSocket } from "../api/socket";
import { navigate } from "@reach/router";
import { PockerActions } from "./components/PockerActions";
import { Table } from "./components/Table";

export const Game = ({ location, socket, setSocket, gameCode, user }) => {
  const [room, setRoom] = useState(null);

  function startGame() {
    console.log("gameCode es", gameCode);
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

    socket.emit("createOrJoinRoom", {
      userId: sessionStorage.getItem("userId"),
      gameCode: location.state.gameCode,
    });
  }, []);

  useEffect(() => {
    socket &&
      socket.on("joinedRoom", (room) => {
        console.log("call joinedRoom", room);
        setRoom(room);
      });

    socket &&
      socket.on("updatedRoom", (room) => {
        console.log("updatedRoom", room);
        setRoom(room);
      });
  }, [socket]);

  return (
    <div>
      <div path="/game/:id">Juego: {location.state.gameCode}</div>
      <hr />
      <div>
        {room != null &&
          (room.gameStarted ? (
            <PockerActions socket={socket} />
          ) : room.owner === sessionStorage.getItem("userId") ? (
            <button onClick={startGame}>Iniciar juego</button>
          ) : (
            <>
              <span style={{ color: "red" }}>
                Esperar a que el host inicie la partida
              </span>
            </>
          ))}
      </div>
      <Table />
      <pre>
        <div>
          <code>
            Room -{">"} {JSON.stringify(room, null, 2)}
          </code>
        </div>
      </pre>
    </div>
  );
};

import React, { useState, useEffect, useCallback } from "react";
import { createSocket, getSocket } from "../api/socket";
import { navigate } from "@reach/router";
import { PockerActions } from "./components/PockerActions";
import { AvailableSites } from "./components/AvailableSites";

export const Game = ({ location, socket, setSocket, gameCode, user }) => {
  const [room, setRoom] = useState(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    room &&
      setPlayer(
        room.players.find(
          (player) => player._id === sessionStorage.getItem("userId")
        )
      );
  }, [room]);

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

    socket.emit("createOrJoinRoom", {
      userId: sessionStorage.getItem("userId"),
      gameCode: location.state.gameCode,
    });
  }, []);

  useEffect(() => {
    socket &&
      socket.on("joinedRoom", (room) => {
        setRoom(room);
      });

    socket &&
      socket.on("updatedRoom", (room) => {
        setRoom(room);
      });
  }, [socket]);

  return (
    <div>
      <hr />
      <div path="/game/:id">Juego: {location.state.gameCode}</div>
      {room && room.gameStarted && player && player.turn && (
        <div
          style={{
            background: "darkblue",
            color: "white",
            padding: "1rem",
            border: "1px solid white",
            fontWeight: 600,
            borderRadius: "15px",
            margin: "2rem 0",
            textAlign: "center",
          }}
        >
          ES TU TURNO
        </div>
      )}
      <div>
        <div>
          {room && room.round ? (
            <>
              <h3>
                ROUND: <span>{room.round.toUpperCase()}</span>
              </h3>
              <h4>
                -- Fichas apostadas:{" "}
                <span>
                  {room &&
                    room.players.find(
                      (player) =>
                        player._id === sessionStorage.getItem("userId")
                    ).betAmount}
                </span>
              </h4>
            </>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          {room &&
            !room.gameStarted &&
            (room.owner === sessionStorage.getItem("userId") ? (
              <button onClick={startGame}>Iniciar juego</button>
            ) : (
              <>
                <span style={{ color: "red" }}>
                  Esperar a que el host inicie la partida
                </span>
              </>
            ))}

          {room && room.gameStarted && player && player.turn && (
            <PockerActions socket={socket} gameCode={gameCode} room={room} />
          )}
        </div>
        {room && !room.gameStarted && (
          <AvailableSites socket={socket} gameCode={gameCode} room={room} />
        )}
      </div>
      <hr />

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

import React, { useState, useEffect, useCallback } from "react";
import { createSocket, getSocket } from "../api/socket";
import { navigate } from "@reach/router";
import { PockerActions } from "./components/PockerActions";
import { AvailableSites } from "./components/AvailableSites";

let styleCardInside = {
  backgroundColor: "white",
  color: "black",
};

export const Game = ({
  location,
  socket,
  setSocket,
  gameCode,
  username,
  avatarId = 0,
}) => {
  const [room, setRoom] = useState(null);
  const [player, setPlayer] = useState(null);
  const [betAmount, setBetAmount] = useState(0);

  useEffect(() => {
    room &&
      setPlayer(
        room.players.find(
          (player) => player._id === sessionStorage.getItem("userId")
        )
      );

    room && player && setBetAmount(room.actualMaxBet - player.betAmount);
  }, [room, player]);

  function startGame() {
    socket.emit("startGame", { gameCode: gameCode || location.state.gameCode });
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
      username,
      avatarId,
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
      <div>
        <div>
          {room && room.round ? (
            <>
              <h3>
                ROUND: <span>{room.round.toUpperCase()}</span>
              </h3>
              <h4>
                {player && player.cards && player.cards.length > 0 ? (
                  <div
                    style={{
                      fontSize: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      backgroundColor: "darkgreen",
                      padding: "1rem 0",
                      borderRadius: "20px",
                      position: "relative",
                    }}
                  >
                    {room && room.gameStarted && player && player.turn && (
                      <div
                        style={{
                          position: "absolute",
                          background: "blue",
                          borderRadius: "10px",
                          border: "2px solid white",
                          top: -15,
                          right: 10,
                          padding: "0.5rem 1rem",
                        }}
                      >
                        T
                      </div>
                    )}
                    <div
                      style={{
                        backgroundColor: "darkgreen",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          background: "green",
                          borderRadius: "15px",
                          padding: "0.5rem 1rem",
                        }}
                      >
                        💵 {room && room.totalBetAmount}
                      </span>
                      <span
                        style={{
                          background: "darkgreen",
                          borderRadius: "15px",
                          padding: "0.5rem 1rem",
                        }}
                      >
                        {room &&
                          room.players.map((p, index) => {
                            let sty = {
                              background: "darkgreen",
                              fontSize: "0.8rem",
                            };
                            let isyou = p._id === player._id;
                            if (isyou) {
                              sty = {
                                background: "yellow",
                                color: "black",
                                fontSize: "1rem",
                              };
                            }
                            return (
                              <div style={sty} key={index}>
                                <span style={sty}>
                                  <span role="img" aria-label="money">
                                    💵
                                  </span>
                                  {p.chips}|
                                </span>
                                <span style={sty}>
                                  {p.name || (
                                    <span role="img" aria-label="money">
                                      👨🏻
                                    </span>
                                  )}
                                  |💰
                                </span>
                                <span style={sty}>{p.betAmount}</span>
                              </div>
                            );
                          })}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "darkgreen",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "0.5rem",
                          backgroundColor: "darkgreen",
                        }}
                      ></span>
                      {player &&
                        player.cards &&
                        player.cards.length > 0 &&
                        player.cards.map((card, index) => {
                          const value = card.split("-")[0];
                          const type = card.split("-")[1];

                          return (
                            <button
                              key={index}
                              style={{
                                background: "white",
                                fontSize: "1.5rem",
                                padding: "2rem 0.4rem",
                                width: "80px",
                                margin: "0 0.2rem",
                              }}
                            >
                              <span style={styleCardInside}>{value}</span>
                              {type === "h" ? (
                                <span style={styleCardInside}>❤</span>
                              ) : type === "c" ? (
                                <span style={styleCardInside}>♣️</span>
                              ) : type === "s" ? (
                                <span style={styleCardInside}>♠</span>
                              ) : type === "d" ? (
                                <span style={styleCardInside}>♦️</span>
                              ) : (
                                "🔥"
                              )}
                            </button>
                          );
                        })}
                    </div>
                    <div
                      style={{
                        opacity: room && room.hand.length > 0 ? 1 : 0,
                        background: "red",
                        padding: "1rem 0.2rem",
                        borderRadius: "20px",
                      }}
                    >
                      {room && room.hand && room.hand.length > 0 ? (
                        room.hand.map((card, index) => {
                          const value = card.split("-")[0];
                          const type = card.split("-")[1];

                          return (
                            <div key={index}>
                              <button
                                style={{
                                  background: "white",
                                  fontSize: "1.2rem",
                                  padding: "1.5rem 0.4rem",
                                  width: "60px",
                                  margin: "0 0.2rem",
                                }}
                              >
                                <span style={styleCardInside}>{value}</span>
                                {type === "h" ? (
                                  <span style={styleCardInside}>❤</span>
                                ) : type === "c" ? (
                                  <span style={styleCardInside}>♣️</span>
                                ) : type === "s" ? (
                                  <span style={styleCardInside}>♠</span>
                                ) : type === "d" ? (
                                  <span style={styleCardInside}>♦️</span>
                                ) : (
                                  "🔥"
                                )}
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
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
            <PockerActions
              socket={socket}
              gameCode={gameCode}
              room={room}
              location={location}
            />
          )}
        </div>
        {room && !room.gameStarted && (
          <AvailableSites
            socket={socket}
            gameCode={gameCode}
            room={room}
            location={location}
          />
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

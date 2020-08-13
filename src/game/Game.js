import React, { useState, useEffect } from "react";
import { createSocket, getSocket } from "../api/socket";
import { PockerActions } from "./components/PockerActions";
import { AvailableSites } from "./components/AvailableSites";
import { ShowCards } from "./components/ShowCards";

export const Game = ({
  location,
  socket,
  setSocket,
  username,
  avatarId = 0,
}) => {
  const [room, setRoom] = useState(null);
  const [player, setPlayer] = useState(null);
  const gameCodeFromUrl = location.state
    ? location.state.gameCode
    : location.href.split("/").pop();

  useEffect(() => {
    room &&
      setPlayer(
        room.players.find(
          (player) => player._id === sessionStorage.getItem("userId")
        )
      );
  }, [room]);

  function startGame() {
    socket.emit("startGame", { gameCode: gameCodeFromUrl });
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
      gameCode: gameCodeFromUrl,
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
      <div>Juego: {gameCodeFromUrl}</div>
      {player && player.winner ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            background: "black",
            fontSize: "3rem",
          }}
        >
          G A N A D O R
        </div>
      ) : (
        <></>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
          fontSize: "1.2rem",
          fontWeight: 500,
        }}
      >
        {player ? player.handRankLabel : ""}
      </div>
      <div>
        {player && player.bestHand && player.bestHand.length > 0 ? (
          <ShowCards
            styleComponent={{
              display: "flex",
              justifyContent: "space-around",
              background: player && player.winner ? "yellow" : "gray",
              padding: "1rem 0.2rem",
              borderRadius: "20px",
            }}
            styleCards={{
              fontSize: "1rem",
              padding: "1.2rem 0.4rem",
              width: "50px",
              margin: "0 0.2rem",
            }}
            cards={player && player.bestHand != null ? player.bestHand : []}
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        <div>
          {room && room.round ? (
            <>
              <h3>
                Round: <span>{room.round.toUpperCase()}</span> -{" "}
                <span>{room.roundIndex}</span>
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
                            let styTurn = {};
                            let sty = {
                              background: "darkgreen",
                              fontSize: "0.8rem",
                            };
                            let isyou = p._id === player._id;
                            if (isyou) {
                              sty = {
                                background: "yellow",
                                color: "black",
                                // fontSize: "1rem",
                              };
                            }
                            let isTurn = p.turn;
                            if (isTurn) {
                              styTurn = {
                                ...sty,
                                // background: "red",
                                border: "5px solid red",
                                fontSize: "1rem",
                              };
                            }
                            if (p.cards.length === 0) {
                              sty = {
                                ...sty,
                                background: "gray",
                                color: "gray",
                              };
                            }
                            return (
                              <div style={{ ...sty, ...styTurn }} key={index}>
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
                                <span style={sty}>
                                  {" "}
                                  {p.dealer && <span style={sty}>🅳</span>}
                                </span>
                                <span style={sty}>
                                  {" "}
                                  {p.isAgressor && <span style={sty}>🔥</span>}
                                </span>
                              </div>
                            );
                          })}
                      </span>
                    </div>
                    {player && player.cards && player.cards.length > 0 && (
                      <ShowCards
                        styleComponent={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "darkgreen",
                        }}
                        cards={player.cards}
                      />
                    )}
                    {room && room.hand && room.hand.length > 0 && (
                      <ShowCards
                        styleComponent={{
                          background: "red",
                          padding: "1rem 0.2rem",
                          borderRadius: "20px",
                        }}
                        styleCards={{
                          fontSize: "1rem",
                          padding: "1.2rem 0.4rem",
                          width: "50px",
                          margin: "0 0.2rem",
                        }}
                        cards={room.hand}
                      />
                    )}
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
              gameCode={gameCodeFromUrl}
              room={room}
              location={location}
              player={player}
            />
          )}
        </div>
        {room && !room.gameStarted && (
          <AvailableSites
            socket={socket}
            gameCode={gameCodeFromUrl}
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

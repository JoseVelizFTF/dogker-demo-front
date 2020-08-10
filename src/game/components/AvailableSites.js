import React, { useState, useEffect, useCallback } from "react";

let buttonStyle = {
  border: "0.5px solid white",
  outline: "none",
  cursor: "pointer",
  margin: "0 0.5rem",
  padding: "1rem 1rem",
};

let buttonStyleSelected = {
  ...buttonStyle,
  backgroundColor: "yellow",
};
let buttonStyleReserved = {
  ...buttonStyle,
  backgroundColor: "red",
  color: "white",
};

export const AvailableSites = ({ socket, gameCode, room, location }) => {
  const getButtonStyle = useCallback(
    (numberSite) => {
      const player =
        room &&
        room.players.find((player) => {
          return player._id === sessionStorage.getItem("userId");
        });
      return player && player.site === numberSite
        ? buttonStyleSelected
        : buttonStyle;
    },
    [room]
  );

  function sendSite(numberSite) {
    const objToSend = {
      userId: sessionStorage.getItem("userId"),
      numberSite,
      gameCode: gameCode || location.state.gameCode,
    };
    socket.emit("setPlayerSite", objToSend);
  }

  return (
    <div style={{ margin: "0.5rem 0" }}>
      <div>Sitios disponibles:</div>
      <div style={{ margin: "0.5rem 0", display: "flex" }}>
        <button style={getButtonStyle(1)} onClick={() => sendSite(1)}>
          1
        </button>
        <button style={getButtonStyle(2)} onClick={() => sendSite(2)}>
          2
        </button>
        <button style={getButtonStyle(3)} onClick={() => sendSite(3)}>
          3
        </button>
        <button style={getButtonStyle(4)} onClick={() => sendSite(4)}>
          4
        </button>
        <button style={getButtonStyle(5)} onClick={() => sendSite(5)}>
          5
        </button>
        <button style={getButtonStyle(6)} onClick={() => sendSite(6)}>
          6
        </button>
        <button style={getButtonStyle(7)} onClick={() => sendSite(7)}>
          7
        </button>
        <button style={getButtonStyle(8)} onClick={() => sendSite(8)}>
          8
        </button>
        <button style={getButtonStyle(9)} onClick={() => sendSite(9)}>
          9
        </button>
      </div>
    </div>
  );
};

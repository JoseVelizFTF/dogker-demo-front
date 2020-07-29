import React from "react";

export const Game = ({ location }) => {
  return (
    <div>
      <div path="/game/:id">Juego: {location.state.roomCode}</div>
    </div>
  );
};

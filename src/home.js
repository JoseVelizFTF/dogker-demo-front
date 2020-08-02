import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

export const Home = ({ gameCode, setUser, user, setGameCode, baseUrl }) => {
  const [gameState, setGameState] = useState(null);
  const [username, setUsername] = useState("");

  async function createOrUpdateUser(userId) {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    let { success = false, payload = null } = await response.json();
    if (success) {
      setUser(payload);
      setGameCode(payload.code);
      payload._id && sessionStorage.setItem("userId", payload._id);
    } else {
      console.error("Error en el servidor");
    }
  }

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    createOrUpdateUser(userId);
  }, []);

  function createOrJoinRoom() {
    sessionStorage.setItem("username", username);
    navigate(`/game/${gameCode}`, { state: { gameCode } });
  }

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
          onChange={(e) => setGameCode(e.target.value)}
          placeholder={gameCode}
        />
      </div>
      <br />
      <div>Tu código de sala es: {user && user.code}</div>
      <br />
      <div>
        <button onClick={createOrJoinRoom}>Entrar a la mesa</button>
      </div>
    </div>
  );
};

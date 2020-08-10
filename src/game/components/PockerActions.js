import React, { useState, useEffect } from "react";

export const PockerActions = ({ socket, gameCode, room, location }) => {
  const [playerOptions, setPlayerOptions] = useState([]);
  const [showBetSection, setShowBetSection] = useState(false);
  const [betAmount, setBetAmount] = useState(0);

  useEffect(() => {
    setPlayerOptions(room.options);
  }, [room]);

  function bet() {
    socket &&
      socket.emit("bet", {
        userId: sessionStorage.getItem("userId"),
        amount: betAmount,
        gameCode,
      });
  }

  function fold() {
    socket &&
      socket.emit("fold", {
        userId: sessionStorage.getItem("userId"),
        gameCode: gameCode || location.state.gameCode,
      });
  }

  function raise() {
    setShowBetSection(!showBetSection);
  }

  return (
    <div>
      {showBetSection ? (
        <>
          <div>
            <h4>Apuesta mínima: {room && room.actualMaxBet}</h4>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>
                <span>Total: </span>
                <input
                  type="text"
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder={room && room.actualMaxBet}
                  style={{
                    backgroundColor: "white",
                    padding: "0.2rem 0.5rem",
                    color: "black",
                    fontSize: "1.2rem",
                    width: "70px",
                    height: "30px",
                    marginRight: "1rem",
                  }}
                />
              </h3>
              <button
                onClick={bet}
                style={{
                  margin: "0.2rem 0",
                  background: "green",
                  color: "white",
                  padding: "0.5rem 0.8rem",
                }}
              >
                Apostar
              </button>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
      <div style={{ display: "flex" }}>
        {room &&
          room.options &&
          room.options.length > 0 &&
          room.options.map((opt, index) => {
            let buttonLabel = null;
            let disabled = false;
            let action = () => {};
            switch (opt) {
              case "raise":
                buttonLabel = "Subir";
                action = raise;
                break;
              case "fold":
                buttonLabel = "Retirarse";
                action = fold;
                break;
              case "check":
                buttonLabel = "Pasar";
                action = bet;
                break;
              default:
                break;
            }

            return buttonLabel ? (
              <button
                key={index}
                disabled={disabled}
                onClick={action}
                style={{ marginRight: "1rem", padding: ".5rem 1rem" }}
              >
                {buttonLabel}
              </button>
            ) : (
              <></>
            );
          })}
      </div>
      <hr />
    </div>
  );
};

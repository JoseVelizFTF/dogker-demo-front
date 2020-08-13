import React, { useState, useEffect } from "react";

export const PockerActions = ({ socket, gameCode, room, location, player }) => {
  const [playerOptions, setPlayerOptions] = useState([]);
  const [showBetSection, setShowBetSection] = useState(false);
  const [betAmount, setBetAmount] = useState(0);

  useEffect(() => {
    setPlayerOptions(room.options);
  }, [room]);

  function bet() {
    let value = Boolean(+betAmount)
      ? +betAmount
      : +room.actualMaxBet - +player.betAmount;
    console.log(value);
    socket &&
      socket.emit("bet", {
        userId: sessionStorage.getItem("userId"),
        amount: Boolean(+betAmount)
          ? +betAmount
          : +room.actualMaxBet - +player.betAmount,
        gameCode: gameCode || location.state.gameCode,
      });
  }

  function fold() {
    socket &&
      socket.emit("fold", {
        userId: sessionStorage.getItem("userId"),
        gameCode: gameCode || location.state.gameCode,
      });
  }

  return (
    <div>
      <div>
        {/* <h4>Apuesta mínima: {room && room.actualMaxBet}</h4> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>
            <span>Total de apuesta: </span>
            <input
              type="text"
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder={
                room && player && room.actualMaxBet - player.betAmount
              }
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
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {room &&
          room.options &&
          room.options.length > 0 &&
          room.options.map((opt, index) => {
            let buttonLabel = null;
            let sty = { marginRight: "1rem", padding: ".5rem 1rem" };
            let disabled = false;
            let action = () => {};
            switch (opt) {
              case "raise":
                buttonLabel = "Apostar";
                sty = { ...sty, background: "green", color: "white" };
                action = bet;
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
                style={sty}
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

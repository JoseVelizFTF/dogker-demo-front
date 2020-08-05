import React, { useState, useEffect } from "react";

export const PockerActions = ({ socket, gameCode, room }) => {
  const [bets, setBets] = useState([]);
  const [playerOptions, setPlayerOptions] = useState([]);
  const [showBetSection, setShowBetSection] = useState(false);

  useEffect(() => {
    setPlayerOptions(room.options);
  }, [room]);

  function addBet(amount) {
    setBets((bets) => [...bets, amount]);
  }

  function bet() {
    let betAmount = bets.reduce((acc, curr) => acc + curr, 0);
    socket &&
      socket.emit("bet", {
        userId: sessionStorage.getItem("userId"),
        amount: betAmount,
        gameCode,
      });
  }

  function check() {
    console.log("check");
  }
  function fold() {
    socket &&
      socket.emit("fold", {
        userId: sessionStorage.getItem("userId"),
        gameCode,
      });
  }
  // function call() {
  //   socket.emit("bet", { gameCode, amount, userId });
  // }
  function raise() {
    setShowBetSection(!showBetSection);
  }

  function removeBet(index) {
    var array = [...bets]; // make a separate copy of the array
    array.splice(index, 1);
    setBets(array);
  }

  function getCoinStyle(currency) {
    let style = {
      padding: "1rem",
      borderRadius: "50%",
      minWidth: "50px",
      margin: " 0 1rem",
    };
    return style;
  }

  return (
    <div>
      <h4>Es tu turno:</h4>
      {showBetSection ? (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>Monedas: </div>
            <button style={getCoinStyle(5)} onClick={() => addBet(5)}>
              5
            </button>
            <button style={getCoinStyle(10)} onClick={() => addBet(10)}>
              10
            </button>
            <button style={getCoinStyle(20)} onClick={() => addBet(20)}>
              20
            </button>
            <button style={getCoinStyle(50)} onClick={() => addBet(50)}>
              50
            </button>
            <button style={getCoinStyle(100)} onClick={() => addBet(100)}>
              100
            </button>
            <button style={getCoinStyle(200)} onClick={() => addBet(200)}>
              200
            </button>
          </div>
          <div>
            <ul style={{ display: "flex", listStyle: "none" }}>
              {bets.length > 0 &&
                bets.map((bet, index) => (
                  <li key={index}>
                    <button
                      style={{
                        ...getCoinStyle(bet),
                        margin: "-0.6rem",
                      }}
                      onClick={() => removeBet(index)}
                    >
                      {bet}
                    </button>
                  </li>
                ))}
            </ul>
            <h4>Apuesta mínima (RAISE/SUBIR): {room && room.actualMaxBet}</h4>
            <h3>
              Total:{" "}
              {/* {bets.reduce((acc, curr) => acc + curr, room.actualMaxBet || 0)} */}
              {bets.reduce((acc, curr) => acc + curr, 0)}
            </h3>
            <button
              onClick={bet}
              style={{
                margin: "1rem 0",
                background: "green",
                color: "white",
                padding: "1rem 1rem",
              }}
            >
              Apostar
            </button>
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
              // case "call":
              // buttonLabel = "Igualar";
              // disabled = true;
              // break;
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
                action = check;
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
        {/* <button
          onClick={() => setShowBetSection(!showBetSection)}
          style={{ marginRight: "1rem", padding: ".5rem 1rem" }}
        >
          Apostar
        </button>
        <button
          onClick={check}
          style={{ marginRight: "1rem", padding: ".5rem 1rem" }}
        >
          Pasar
        </button>
        <button
          onClick={fold}
          style={{ marginRight: "1rem", padding: ".5rem 1rem" }}
        >
          Retirarse
        </button> */}
      </div>
      <hr />
    </div>
  );
};

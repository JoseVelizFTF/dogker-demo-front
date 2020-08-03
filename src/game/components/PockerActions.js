import React, { useState } from "react";

export const PockerActions = ({ socket }) => {
  const [bets, setBets] = useState([]);
  const [showBetSection, setShowBetSection] = useState(true);

  function bet(amount) {
    setBets((bets) => [...bets, amount]);
  }

  function sendBet() {
    let betAmount = bets.reduce((acc, curr) => acc + curr, 0);
    console.log("sending to bet: ", betAmount);
    socket && socket.emit("betting", betAmount);
  }

  function removeBet(index) {
    var array = [...bets]; // make a separate copy of the array
    array.splice(index, 1);
    setBets(array);
  }

  return (
    <div>
      <button
        style={{ margin: "0.5rem 0", background: "gray", color: "white" }}
        onClick={() => setShowBetSection(!showBetSection)}
      >
        Show/Hide
      </button>
      {showBetSection ? (
        <>
          <div style={{ display: "flex" }}>
            <div>Apostar: </div>
            <button style={{ margin: "0 0.5rem" }} onClick={() => bet(5)}>
              5
            </button>
            <button style={{ margin: "0 0.5rem" }} onClick={() => bet(10)}>
              10
            </button>
            <button style={{ margin: "0 0.5rem" }} onClick={() => bet(20)}>
              20
            </button>
            <button style={{ margin: "0 0.5rem" }} onClick={() => bet(50)}>
              50
            </button>
            <button style={{ margin: "0 0.5rem" }} onClick={() => bet(100)}>
              100
            </button>
            <button style={{ margin: "0 0.5rem" }} onClick={() => bet(200)}>
              200
            </button>
          </div>
          <div>
            <ul>
              {bets.length > 0 &&
                bets.map((bet, index) => (
                  <li key={index} style={{ margin: "0.2rem 0" }}>
                    {bet}
                    <button onClick={() => removeBet(index)}>-</button>
                  </li>
                ))}
            </ul>
            <h3>Total: {bets.reduce((acc, curr) => acc + curr, 0)}</h3>
            <button onClick={sendBet}>Apostar</button>
          </div>
        </>
      ) : (
        <div></div>
      )}
      <hr />
    </div>
  );
};

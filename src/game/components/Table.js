import React, { useState } from "react";

const buttonStyle = {
  // borderRadius: "50%",
  border: "0.5px solid white",
  outline: "none",
  cursor: "pointer",
  margin: "0 0.5rem",
  padding: "1rem 1rem",
};

export const Table = ({ socket }) => {
  function sendSite(numberSite) {
    console.log("numberSite", numberSite);
  }

  return (
    <div style={{ margin: "0.5rem 0" }}>
      <div>Sitios disponibles:</div>
      <div style={{ margin: "0.5rem 0", display: "flex" }}>
        <button style={buttonStyle} onClick={() => sendSite(1)}>
          1
        </button>
        <button style={buttonStyle} onClick={() => sendSite(2)}>
          2
        </button>
        <button style={buttonStyle} onClick={() => sendSite(3)}>
          3
        </button>
        <button style={buttonStyle} onClick={() => sendSite(4)}>
          4
        </button>
        <button style={buttonStyle} onClick={() => sendSite(5)}>
          5
        </button>
        <button style={buttonStyle} onClick={() => sendSite(6)}>
          6
        </button>
        <button style={buttonStyle} onClick={() => sendSite(7)}>
          7
        </button>
        <button style={buttonStyle} onClick={() => sendSite(8)}>
          8
        </button>
        <button style={buttonStyle} onClick={() => sendSite(9)}>
          9
        </button>
      </div>
    </div>
  );
};

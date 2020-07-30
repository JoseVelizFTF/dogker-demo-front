import React, { useState, useEffect } from "react";

export const Status = ({ socketConnected, handleSocketConnection }) => {
  return (
    <div>
      <div>
        <b>Connection status:</b>{" "}
        {socketConnected ? "Connected" : "Disconnected"}
      </div>
      {/* <input
        type="button"
        style={{ marginTop: 10 }}
        value={socketConnected ? "Disconnect" : "Connect"}
        onClick={handleSocketConnection}
      /> */}
    </div>
  );
};

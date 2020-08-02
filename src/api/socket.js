import openSocket from "socket.io-client";

const baseUrl = process.env.REACT_APP_BASE_URL;

let socket = null;

const createSocket = () => {
  socket = openSocket(baseUrl);
  socket.on("err", (msg) => console.error("Hey dude -> ", msg));
};

const getSocket = () => {
  return socket;
};

export { createSocket, getSocket };

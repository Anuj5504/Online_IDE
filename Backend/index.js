const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("code-update", (data) => {
    socket.broadcast.emit("code-update", data);
  });
});

// app.post("/run", (req, res) => {
//   // Placeholder for Docker execution
//   res.send("Code execution coming soon");
// });

server.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});

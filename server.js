const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public"))); // serve frontend

let users = {};

io.on("connection", (socket) => {
    console.log("A user connected");

    // store username
    socket.on("set-username", (username) => {
        users[socket.id] = username;
        io.emit("user-joined", username);
    });

    // send and receive messages
    socket.on("chat-message", (msg) => {
        io.emit("chat-message", {
            user: users[socket.id],
            message: msg,
            id: socket.id
        });
    });

    // disconnect
    socket.on("disconnect", () => {
        if (users[socket.id]) {
            io.emit("user-left", users[socket.id]);
            delete users[socket.id];
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

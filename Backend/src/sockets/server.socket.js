const { Server } = require("socket.io");
let io;

const initSocketServer = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });
    console.log("Socket server initialized");
    io.on("connection", (socket) => {
        console.log("A user connected: " + socket.id);

        socket.on("disconnect", () => {
            console.log("A user disconnected: " + socket.id);
        });
    });

    return io;
};

const getSocketServer = () => {
    if (!io) {
        throw new Error("Socket server not initialized");
    }
    return io;
};

module.exports = { initSocketServer, getSocketServer };
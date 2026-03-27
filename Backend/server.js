const app = require("./src/app");
const http = require("http");
const { initSocketServer } = require("./src/sockets/server.socket");

const server = http.createServer(app);
const io = initSocketServer(server);

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
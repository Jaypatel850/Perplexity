const express = require('express');
const connectDB = require('./db/database');
const cookieparser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
module.exports = app;
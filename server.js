
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});

// Test API
app.get("/", (req, res) => {
    res.send("Chat server is running");
});

// Socket connection
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // Receive message from frontend
    socket.on("sendMessage", (data) => {

        console.log("Message received:", data);

        const messageData = {
            id: Date.now() + Math.random(),
            sender: data.sender,
            message: data.message,
            time: new Date()
        };

        // Send message to all connected users
        io.emit("receiveMessage", messageData);

    });

    // User disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

});

// Start server
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

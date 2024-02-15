const express = require("express");
const http = require("http");
const path = require("path");
const WebSocket = require("ws");

const app = express();
app.use(express.static("/public"));
const server = http.createServer(app);
const port = process.env.port || 3000;
const wss = new WebSocket.Server({server});

wss.on("connection", (ws)=>{
    console.log("New Client connected!");
    ws.on("message", (message)=>{
        console.log(`Client send the message: ${message}`);
        ws.send(message);
    })
    ws.on("close", ()=>{
        console.log("Client disconnected");
    })
});

app.get("/websocket", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
})
server.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
})
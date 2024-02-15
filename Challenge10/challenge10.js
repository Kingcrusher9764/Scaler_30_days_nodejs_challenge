const express = require("express");
const path = require("path");

app = express();
app.use(express.static("public"));
port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"));
})
app.get("/styles/style.css", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/styles/styles.css"));
})

app.listen(port, ()=>{
    console.log(`Server running at httpss://localhost:${port}`);
})
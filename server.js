const express = require("express");
const path = require("path");
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(path.join(_dirname, "public", "index.html"));
})

app.get("/notes", function(req, res){
    res.sendFile(path.join(_dirname, "public", "notes.html"));
})

app.listen)prompt, ( => console.log("App listening on port" + PORT));
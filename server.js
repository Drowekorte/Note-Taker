const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid'); 

const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(path.join(_dirname, "public", "index.html"));
})

app.get("/notes", function(req, res){
    res.sendFile(path.join(_dirname, "public", "notes.html"));
})

app.get("/api/notes", function(rec, res){

    fs.readFile("./db/db.json", "utf8", function(req, res){
        res.json(JSON.parse(data))
    })

});

app.post("/api/notes", function(rec, res){
    const note = {
        id: uuidv4();
        title: req.body.title,
        text: req.body.text,
    }
console.log(note);

res.json(note);
});

app.delete("/api/notes:id", function(rec, res){
const { id } = req.params;
});

app.listen(PORT, () => console.log("App listening on port" + PORT));


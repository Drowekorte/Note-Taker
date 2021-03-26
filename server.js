const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
})

app.get("/api/notes", function (req, res) {

    fs.readFile("./db/db.json", "utf8", function (req, res) {
        res.json(JSON.parse(data))
    })

});

app.post("/api/notes", function (req, res) {
    const note = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    }
    fs.readFile("./db/db.json", note, function (req, res) { 
        res.json(note)
    
        fs.writeFile("./db/db.json", note, function (req, res) { 
        req.json(JSON.stringify(data))
        data.push(note)   
    })  
   })   
   console.log(note);  
    // res.json(note);
});

app.delete("/api/notes:id", function (req, res) {
    const { id } = req.params;
});
 
 
app.listen(PORT, () => console.log("App listening on port" + PORT));

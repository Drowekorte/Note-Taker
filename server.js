const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const database = path.join(__dirname, "/db/db.json");

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

    fs.readFile("./db/db.json", "utf8", function (err, data) {
        res.json(JSON.parse(data))
    })

});

app.post("/api/notes", function (req, res) {
    const note = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    }

    fs.readFile("./db/db.json", "utf8", function (err, data) {
        var parsedData = JSON.parse(data);

        parsedData.push(note);

        parsedData = JSON.stringify(parsedData);
        // console.log("Stringified parsed data with push ", parsedData)

        fs.writeFile("./db/db.json", parsedData, function (err, data) {
            if (err) throw err
        })
    })
    res.redirect("back")
})




app.delete("/api/notes/:id", function (req, res) {
    console.log("DELETE")
    const pathToJson = path.join(__dirname, "/db/db.json");
    fs.readFile(pathToJson, "utf8", function (err, data) {
        // res.json(JSON.parse(data))
        let parsedJson = JSON.parse(data)
        console.log(parsedJson)

        for (let i = 0; i < parsedJson.length; i++) {

            if (parsedJson[i].id == req.params.id) {
                // Splice takes i position, and then deletes the 1 note.
                parsedJson.splice(i, 1);
                break;
            }
        }
        const stringJson =  JSON.stringify(parsedJson)
            fs.writeFile(__dirname + '/db/db.json', stringJson, function (err, data) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("Your note was deleted!");
                }
            });
        res.send("Delete")
    })   
});



app.listen(PORT, () => console.log("App listening on port" + PORT));

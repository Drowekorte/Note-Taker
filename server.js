const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
// This uses a randomly generated id for each note.
const { v4: uuidv4 } = require('uuid');
const database = path.join(__dirname, "/db/db.json");

const PORT = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Here we're calling on the html page that the app will start with.
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})
// This "get" calls on the html page that the notes will be displayed on.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
})
// This "get" calls on the json file that stores our notes in json format.
app.get("/api/notes", function (req, res) {

    fs.readFile("./db/db.json", "utf8", function (err, data) {
        res.json(JSON.parse(data))
    })

});
// This "post" will read, parse, stringify, and re-write the .json file.
app.post("/api/notes", function (req, res) {
    // Create a variable for the user input to be stored.
    const note = {
        // This adds a unique id to each note
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    }
    // Read the json file and parse the data. 
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        var parsedData = JSON.parse(data);
        // Push the parsed user input to the note variable.
        parsedData.push(note);
        // Stringify the json data so it can be read.
        parsedData = JSON.stringify(parsedData);
        // console.log("Stringified parsed data with push ", parsedData)
        // Write to the json file for saving.
        fs.writeFile("./db/db.json", parsedData, function (err, data) {
            if (err) throw err
        })
    })
    // Return to the empty note
    res.redirect("back")
})



// This "delete" will read, parse, stringify, and re-write the .json file using the note id to identify the note to be deleted.
app.delete("/api/notes/:id", function (req, res) {
    console.log("DELETE")
    const pathToJson = path.join(__dirname, "/db/db.json");
    fs.readFile(pathToJson, "utf8", function (err, data) {
       
        let parsedJson = JSON.parse(data)
        console.log(parsedJson)

        for (let i = 0; i < parsedJson.length; i++) {
            // This loop will identify if the id matches 
            if (parsedJson[i].id == req.params.id) {
                // Takes the parsed json, calls the index, then removes one item.
                parsedJson.splice(i, 1);
                break;
            }
        }
        // We re-write to th json file here to delete that note by id.
        const stringJson =  JSON.stringify(parsedJson)
            fs.writeFile(__dirname + '/db/db.json', stringJson, function (err, data) {
                if (err) {
                    return alert(err);
                } else {
                    alert("Your note was deleted!");
                }
            });
        res.send("Delete")
    })   
});


// Console logs the PORT we're listening on.
app.listen(PORT, () => console.log("App listening on port" + PORT));

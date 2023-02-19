// added libraries
const express = require('express'); 
const path = require('path');
const fs = require('fs');

// created the port for server
const PORT = process.env.PORT ?? 3001;

// created the app from express
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// pull the db
let notes = require('./db/db.json') || [];
// create id
let dbId = notes[0] || 0;
if (notes.length === 0) {
    notes.push(dbId);
};

// write to db.js
function writeFile(path_=path.join(__dirname, './db/db.json'), data=notes){
    fs.writeFileSync(path_, JSON.stringify(data, null, 2));
}

// array from db
app.get('/api/notes', (req, res) => {
    res.json(notes.slice(1));
});

// get to  '/'
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
// get to  '/notes'
app.get('/notes', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'notes.html'));
});
// get to another pages
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// create a note
app.post('/api/notes', (req, res) => {
    let body = req.body;
    body.id = dbId;
    dbId ++;
    notes[0] = dbId;
    notes.push(body);
    writeFile();
    res.json(body);
});

// delete a note
app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    notes = notes.filter(note => note.id != id || typeof note.id === "undefined");
    writeFile();
    res.json(true);
    console.log(res);
});

// start the server
app.listen(PORT, () => {
    console.log(`start server ${PORT} ^_^ ...`);
});
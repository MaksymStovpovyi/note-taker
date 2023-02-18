// added libraries
const express = require('express'); 
const path = require('path');
const fs = require('fs');

// created the port for server
const PORT = process.env.PORT ?? 3001;

// created the app from express
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));











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

// start server
app.listen(PORT, () => {
    console.log(`start server ${PORT} ^_^ ...`);
});
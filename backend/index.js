const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');

const API_PORT = process.env.API_PORT || 8000;
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Allows Cors Origin allowing access to our localhost API in the frontend
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/api/download', (req, res) => {
    const { pins } = req.body;
    res.attachment('pin_assignment.txt');
    res.type('txt')
    res.send(pins);

    console.log("Sent!");
});


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

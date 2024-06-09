'use strict'; 
const fs = require('fs');

const express = require('express');
const http = require('http');
const path = require('path'); // Import the 'path' module
const app = express();
// Set up middleware to serve static files from the current directory
// app.use(express.static(__dirname));
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'img')));

const server = http.createServer(app);
const PORT = 3000; 
// Add GET REST endpoint /users/:userid
app.get('/users/:userid', (req, res) => {
    const userId = req.params.userid;
    // For now, we'll just send the userId back in the response
    res.json({ message: `User ID is ${userId}` });
}); 
app.get('/users', (req, res) => {
    const filePath = path.join(__dirname, 'json/users.json');
 
readData(filePath)
    .then(data => {
       
        res.json(data);
    })
    .catch(err => {
        console.error('Error reading the file:', err);
    });
    
}); 

  
  


server.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
}); 
function readData (filePath) {
    return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
    reject(err);
                } else {
    resolve(data);
                }
            });
        });
    }

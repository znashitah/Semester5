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
    res.json({ message: `User ID is ${userId}` });
});
app.get('/users', (req, res) => {
    const filePath = path.join(__dirname, 'json/users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
});

app.delete('/users/:userid', (req, res) => {
    const userId = req.params.userid;
    const filePath = path.join(__dirname, 'json/users.json');

    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);

    // Find the index of the user to delete
    const userIndex = users.findIndex(user => user.userId === userId);

    if (userIndex !== -1) {
        // Remove the user from the array
        users.splice(userIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});




server.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});

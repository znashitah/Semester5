'use strict';
const fs = require('fs');


const express = require('express');
const http = require('http');
const path = require('path'); // Import the 'path' module
const app = express(); 
const mysql = require('mysql2'); // Import the mysql2 package
// Set up middleware to serve static files from the current directory
// app.use(express.static(__dirname));
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.json());
const server = http.createServer(app);
const PORT = 3000; 
// MySQL database connection configuration
const dbConfig = {
    host: '127.0.0.1', // Corrected to only include the IP address
    port: 3306, // Added the port property
    user: 'root',
    password: 'Usman123',
    database: 'APP_DB'
};

// Add GET REST endpoint /users/:userid
app.get('/users/:userid', (req, res) => {
    const userId = req.params.userid; 
    const filePath = path.join(__dirname, 'json/users.json');
    const data = fs.readFileSync(filePath, 'utf8'); 
     // Parse the JSON data
     const users = JSON.parse(data);

     // Find the user with the matching userId
     const user = users.find(user => user.userId === userId);
     
     if (user) {
         res.json(user);
     } else {
         res.status(404).json({ message: `User ID ${userId} not found` });
     }

  
});
app.get('/users', (req, res) => {
    console.log(__dirname);
    const filePath = path.join(__dirname, 'json/users.json');
    console.log(filePath)
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
}); 
app.get('/userindb', (req, res) => {
    const query = 'SELECT * FROM USER'; // SQL query to retrieve all users 
    const connection = mysql.createConnection(dbConfig);

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving users from MySQL:', err);
            return res.status(500).json({ message: 'Error retrieving users from database' });
        }

        res.status(200).json(results); // Send the retrieved users as JSON
    });
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
// DELETE endpoint to remove a user
app.delete('/userindb/:USERID', (req, res) => {
    const USERID = req.params.USERID;

    // SQL query to delete a user
    const query = 'DELETE FROM USER WHERE USERID = ?';
    const values = [USERID];
    const connection = mysql.createConnection(dbConfig);

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error deleting user from MySQL:', err);
            return res.status(500).json({ message: 'Error deleting user from database' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
});
app.post('/users', (req, res) => {
    // Read existing users from the file
    const filePath = path.join(__dirname, 'json/users.json');
    const usersData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(usersData);

    // Get new user data from request body
    const newUser = req.body;
    console.log(newUser)

    // Add new user to the users array
    users.push(newUser);

    // Write updated users array back to the file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');

    // Respond with success message
    res.status(201).json({ message: 'User added successfully!' });
}); 
// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email) ; 
    console.log(password) ; 

    try {
        // Read the users.json file synchronously
        const usersFilePath = path.join(__dirname, 'json/users.json');
        const data = fs.readFileSync(usersFilePath, 'utf8');
        const users = JSON.parse(data);

        // Check if user exists with the given email and password
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            res.status(200).send('Successfully logged in');
        } else {
            res.status(401).send('Recheck your email and password');
        }
    } catch (err) {
        console.error('Error reading users file:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.put('/users/:userId', (req, res) => {
    // Read existing users from the file
    const filePath = path.join(__dirname, 'json/users.json');
    const usersData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(usersData);
    // Get user id from the request parameters
    const userId = req.params.userId;
 
    // Find the user with the given user id
    const userIndex = users.findIndex(user => user.userId === userId);
 
    // Check if user with given user id exists
    if (userIndex !== -1) {
        // Check if old password matches
        if (req.body.Old_password === users[userIndex].password) {
            // Check if new password and confirm password match
            if (req.body.New_password === req.body.Confirm_password) {
                // Update the password for the user
                users[userIndex].password = req.body.New_password;
                // Write updated users array back to the file
                fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
                // Respond with success message
                res.status(200).json({ message: 'Password updated successfully!' });
            } else {
                // Respond with error message if new password and confirm password do not match
                res.status(400).json({ message: 'New password and confirm password do not match' });
            }
        } else {
            // Respond with error message if old password does not match
            res.status(400).json({ message: 'Old password is incorrect' });
        }
    } else {
        // Respond with error message if user with given user id is not found
        res.status(404).json({ message: 'User not found' });
    }
}); 
app.post('/userindb', (req, res) => {
     // Get new user data from request body
     const newUser = req.body;
     console.log(newUser);

     // Insert new user into MySQL database
     const { firstname, lastname, age, email, dateofbirth, password, gender, userId } = newUser;
     const query = `INSERT INTO USER (USERID, FNAME, LNAME, AGE, EMAIL, DOB, PASSWORD, GENDER) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
     const values = [userId, firstname, lastname, age, email, dateofbirth, password, gender];
 
     const connection = mysql.createConnection(dbConfig);
     connection.query(query, values, (err, results) => {
        connection.end();

        if (err) {
            console.error('Error inserting user into MySQL:', err);
            return res.status(500).json({ message: 'Error adding user to database' });
        }

        console.log('User added to MySQL with ID:', results.insertId);
        res.status(201).json({ message: 'User added successfully!' });
    });

 });





server.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});

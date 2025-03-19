const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.static('public'));

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'schoolnodejs',
    waitForConnections: true,
    user: 'root',
    password: 'root123'
});

pool.getConnection(function (err) {
    if (err) {
        return console.log("error occurred while connecting");
    } else {
        return console.log("connection created with mysql successfully");
    }
});

app.get("/", (req, resp) => {
    resp.status(200);
    resp.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = pool;
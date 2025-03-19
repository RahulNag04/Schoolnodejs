const express = require('express');
const pool = require('./database');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

app.get("/listSchools", (req, resp) => {
  pool.query('SELECT * FROM schools', (err, results) => {
    if (err) {
      console.log('Error executing query: ' + err.stack);
      resp.status(500).send('Error fetching users');
      return;
    }
    resp.status(200)
    resp.send(results);
  });
});

app.get("/", (req, resp) => {
  resp.status(200);
  resp.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/addSchool', (req, resp) => {
  const name = req.body.name;
  const address = req.body.address;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  pool.query('insert into schools(name, address, latitude, longitude) values(?, ?, ?, ?)', [name, address, latitude, longitude], (err, result) => {
    if (err) {
      console.log("error");
    } else {
      resp.status(200);
      resp.send(result);
    }
  });
});

app.get('/listSchools/:id', (req, resp) => {
  const id = req.params.id
  const fetch_query = "Select * from schools where id = " + id;
  pool.query(fetch_query, [id], (err, result) => {
    if (err) {
      resp.send('err', err);
    } else {
      resp.send(result);
    }
  })
});

app.listen(5000)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/index');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/events', (req, res) => {
  const timestamp = req.query.timestamp;
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  console.log('Hit server route!');
  db.retrieve(timestamp, lat, lng, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(JSON.stringify('Error retrieving data from the database'));
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});

app.listen(3000, () => console.log('Listening on port 3000!'));

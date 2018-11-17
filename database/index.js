const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost/radius';

mongoose.connect(mongoUrl);

const eventSchema = new mongoose.Schema({
  name: String,
  host: String,
  description: String,
  fee: Number,
  lat: Number,
  lng: Number,
  startTime: Date,
  endTime: Date,
  address: String,
  photos: [{
    uri: String,
  }],
  categories: {}
});

const EventModel = mongoose.model('events', eventSchema);

const insert = dataArray => {
  EventModel.insertMany(dataArray)
    .then(() => console.log('Inserted into the database!'))
    .catch(err => {
      console.log('Error writing to the database:', err);
    });
};

const calculateDistance = (userLat, userLng, eventLat, eventLng) => {
  const convertToRadians = Math.PI / 180;
  const earthDiameter = 12472;
  const convertKmToMi = 0.621371;
  userLat *= convertToRadians;
  userLng *= convertToRadians
  eventLat *= convertToRadians;
  eventLng *= convertToRadians;
  const latDiff = eventLat - userLat;
  const lngDiff = eventLng - userLng;
  const h = ( (1 - Math.cos(latDiff)) + (1 - Math.cos(lngDiff)) * Math.cos(userLat) * Math.cos(eventLat) ) / 2;
  return earthDiameter * Math.asin(Math.sqrt(h)) * convertKmToMi;
};

const retrieve = (timestamp, userLat, userLng, handleResponse) => {
  EventModel.find({ startTime: { $lte: timestamp }, endTime: { $gt: timestamp } }).limit(50)
    .then(rawResults => {
      const resultsWithDist = rawResults.map((event) => {
        return Object.assign({}, event._doc, {
          distance: Math.round(calculateDistance(userLat, userLng, event.lat, event.lng) * 100) / 100,
        });
      });
      const sortedResults = resultsWithDist.sort((a, b) => a.distance - b.distance);
      handleResponse(null, sortedResults);
    })
    .catch(err => handleResponse(err, null));
}

module.exports = {
  insert,
  retrieve,
};

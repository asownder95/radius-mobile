const faker = require('faker');
const moment = require('moment');
const db = require('./index');

moment().format();

const generateRandomInt = (min, max) => (
  Math.ceil((Math.random() * (max - min)) + min)
);

const eventCategories = ['meetup', 'food', 'birthday', 'workshop', 'recreation'];
const hosts = ['Ryan', 'Aaron', 'Aika', 'Andrew', 'Anton', 'Brian', 'Cameron', 'Chrystal', 'Dan', 'David', 'Emily', 'Eric', 'Felix', 'Fiona', 'Ian', 'Jamie', 'Jehwa', 'Jesse', 'John', 'Jon', 'Justus', 'Libby', 'Logan', 'Mak', 'Matt C.', 'Mylani', 'Nick', 'Patricia', 'Tom', 'Tona', 'Vincent', 'Volod', 'Matt S.', 'Xiaolei', 'Xue', 'Zane'];

for (let i = 0; i < 1000; i++) {
  const batchStorage = [];
  for (let j = 0; j < 10; j++) {
    const obj = {};
    const host = hosts[generateRandomInt(0, hosts.length - 1)];
    const category = eventCategories[generateRandomInt(0, eventCategories.length -1)];
    obj.name = `${host}'s ${faker.commerce.productAdjective()} Event`;
    obj.host = host;
    obj.description = faker.lorem.paragraphs();
    obj.fee = generateRandomInt(0, 250);
    obj.lat = parseFloat(`37.${generateRandomInt(6000, 8100)}`);
    obj.lng = parseFloat(`-122.${generateRandomInt(3500, 5000)}`);
    obj.startTime = faker.date.between('2018-11-17', '2018-11-28');
    obj.endTime = moment(obj.startTime).add(generateRandomInt(1, 24), 'hours').toDate();
    obj.address = `${faker.address.streetAddress(true)}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`;
    obj.photos = [{
      uri: `https://s3-us-west-1.amazonaws.com/fec-photos/photo${generateRandomInt(1001, 1315)}.jpeg`,
    }];
    obj.categories = {};
    obj.categories[category] = true;
    batchStorage.push(obj);
  }
  db.insert(batchStorage);
}

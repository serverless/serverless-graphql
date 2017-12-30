//please be mindful of the ES limits while creating test data

const faker = require('faker');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

let numRecords = 100;
let numPosts = 25;

//{"index":{"_index":"user","_type":"profile","_id":"8144e3da-7521-4787-a95b-30f4081cd72e"}}

data = [];
const file = 'users.json';

for (let i = 0; i < numRecords; i++) {
  record = {
    name: faker.name.findName(),
    screen_name: faker.internet.userName(),
    location: faker.address.city(),
    description: faker.name.jobTitle(),
    followers_count: faker.random.number(),
    friends_count: faker.random.number(),
    favourites_count: faker.random.number(),
  };

  for (let j = 0; j < numPosts; j++) {
    let info = {
      _index: 'user',
      _type: 'twitter',
      _id: uuidv4(),
    };

    let item = {
      index: info,
    };

    record.tweet = faker.lorem.sentence();

    console.log(JSON.stringify(item));
    console.log(JSON.stringify(record));

    fs.appendFileSync(file, JSON.stringify(item) + '\n', function(err) {
      console.error(err);
    });

    fs.appendFileSync(file, JSON.stringify(record) + '\n', function(err) {
      console.error(err);
    });
  }
}

const faker = require('faker');
const jsonfile = require('jsonfile');

let numRecords = 100;
let numPosts = 25;

data = [];

for (let i = 0; i < numRecords; i++) {
  let posts = [];

  for (let j = 0; j < numPosts; j++) {
    let item = {
      tweet: faker.lorem.sentence(),
    };
    posts.push(item);
  }

  record = {
    name: faker.name.findName(),
    screen_name: faker.internet.userName(),
    location: faker.address.city(),
    description: faker.name.jobTitle(),
    followers_count: faker.random.number(),
    friends_count: faker.random.number(),
    favourites_count: faker.random.number(),
    posts: posts,
  };

  data.push(record);
}

const file = 'users.json';

//insert 1 static record for quick onboarding:
record = {
  name: 'Leonardo di Caprio',
  screen_name: 'LeoDiCaprio',
  location: 'LA',
  description: 'Actor',
  followers_count: 14050000,
  friends_count: 1000,
  favourites_count: 400,
  posts: [
    {
      tweet: 'today will be a good day!',
    },
  ],
};

data.push(record);

jsonfile.writeFile(file, data, function(err) {
  console.error(err);
});

const faker = require('faker');
const jsonfile = require('jsonfile');

const numUsers = 100;
const tweetsPerUser = 25;

const udata = [];

faker.seed(1000);
const tweets = [];

for (let i = 0; i < numUsers; i++) {
  const tweetId = [];
  const handle = faker.internet.userName();

  for (let j = 0; j < tweetsPerUser; j++) {
    const id = faker.random.uuid();
    tweetId.push(id);

    const item = {
      id: id,
      tweet: faker.lorem.sentence(),
      retweeted: faker.random.boolean(),
      retweet_count: faker.random.number({
        min: 1,
        max: 50,
      }),
      favorited: faker.random.boolean(),
      handle: handle,
    };
    tweets.push(item);
  }

  const urecord = {
    name: faker.name.findName(),
    handle: handle,
    location: faker.address.city(),
    description: faker.name.jobTitle(),
    followers_count: faker.random.number({
      min: 1,
      max: 500,
    }),
    friends_count: faker.random.number({
      min: 1,
      max: 500,
    }),
    favourites_count: faker.random.number({
      min: 1,
      max: 5000,
    }),
    id: tweetId,
  };

  udata.push(urecord);
}

const ufile = 'users.json';

jsonfile.writeFileSync(ufile, udata, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('data created successfully');
  }
});

const tfile = 'tweets.json';

jsonfile.writeFileSync(tfile, tweets, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('data created successfully');
  }
});

const faker = require('faker');
const jsonfile = require('jsonfile');

const numUsers = 10;
const tweetsPerUser = 5;
const followersPerUser = 2;

const udata = [];
const tdata = [];
const handleNames = [];

faker.seed(1000);

for (let i = 0; i < numUsers; i++) {
  const handle = faker.internet.userName();
  handleNames.push(handle);
}

for (let i = 0; i < handleNames.length; i++) {
  const following = [];

  //create user info
  for (let k = 0; k < followersPerUser; k++) {
    following.push(handleNames[Math.floor(Math.random() * handleNames.length)]);
  }

  const followers_count = faker.random.number({
    min: 1,
    max: 500,
  });

  const friends_count = faker.random.number({
    min: 1,
    max: 500,
  });

  const favourites_count = faker.random.number({
    min: 1,
    max: 5000,
  });

  const name = faker.name.findName();
  const location = faker.address.city();
  const description = faker.name.jobTitle();

  const userInfo = {
    handle: handleNames[i],
    name: name,
    location: location,
    description: description,
    followers_count: followers_count,
    friends_count: friends_count,
    favourites_count: favourites_count,
    following: following,
  };

  udata.push(userInfo);

  //create tweet info
  for (let j = 0; j < tweetsPerUser; j++) {
    const id = faker.random.uuid();

    const tweetInfo = {
      handle: handleNames[i],
      tweet_id: id,
      tweet: faker.lorem.sentence(),
      retweeted: faker.random.boolean(),
      retweet_count: faker.random.number({
        min: 1,
        max: 50,
      }),
      favorited: faker.random.boolean(),
      created_at: faker.date.between('2016-01-01', '2017-01-27'),
    };

    tdata.push(tweetInfo);
  }
}

const ufile = 'Users.json';
const tfile = 'Tweets.json';

jsonfile.writeFileSync(ufile, udata, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('data created successfully');
  }
});

jsonfile.writeFileSync(tfile, tdata, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('data created successfully');
  }
});

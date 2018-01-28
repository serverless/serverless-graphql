//please be mindful of the ES limits while creating test data

const faker = require('faker');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const jsonfile = require('jsonfile');

let numUsers = 10;
let tweetsPerUser = 5;
const followersPerUser = 2;

const handleNames = [];
//{"index":{"_index":"user","_type":"profile","_id":"8144e3da-7521-4787-a95b-30f4081cd72e"}}

udata = [];

for (let i = 0; i < numUsers; i++) {
  const handle = faker.internet.userName();
  handleNames.push(handle);
}

for (let i = 0; i < numUsers; i++) {
  const followers = [];

  //create user info
  for (let k = 0; k < followersPerUser; k++) {
    followers.push(handleNames[Math.floor(Math.random() * handleNames.length)]);
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
    followers: followers,
  };

  udata.push(userInfo);

  for (let j = 0; j < tweetsPerUser; j++) {
    let info = {
      _index: 'user',
      _type: 'twitter',
      _id: uuidv4(),
    };

    let item = {
      index: info,
    };

    const tweetInfo = {
      handle: handleNames[i],
      tweet: faker.lorem.sentence(),
      retweeted: faker.random.boolean(),
      retweet_count: faker.random.number({
        min: 1,
        max: 50,
      }),
      favorited: faker.random.boolean(),
      created_at: faker.date.between('2016-01-01', '2017-01-27'),
    };

    console.log(JSON.stringify(item));
    console.log(JSON.stringify(tweetInfo));

    fs.appendFileSync('Tweets.json', JSON.stringify(item) + '\n', function(
      err
    ) {
      console.error(err);
    });

    fs.appendFileSync('Tweets.json', JSON.stringify(tweetInfo) + '\n', function(
      err
    ) {
      console.error(err);
    });
  }
}

jsonfile.writeFileSync('Users.json', udata, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('data created successfully');
  }
});

import 'babel-polyfill';
import { OAuth2 } from 'oauth';

const Twitter = require('twitter');

async function getFollowers(handle, consumerKey, consumerSecret) {
  const url = 'followers/list';

  const oauth2 = new OAuth2(
    consumerKey,
    consumerSecret,
    'https://api.twitter.com/',
    null,
    'oauth2/token',
    null
  );

  return new Promise(resolve => {
    oauth2.getOAuthAccessToken(
      '',
      {
        grant_type: 'client_credentials',
      },
      (error, accessToken) => {
        resolve(accessToken);
      }
    );
  })
    .then(accessToken => {
      const client = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        bearer_token: accessToken,
      });

      const params = { screen_name: handle };

      return client
        .get(url, params)
        .then(followers => {
          // console.log(followers);
          const followerArray = [];

          for (let i = 0; i < followers.users.length; i += 1) {
            followerArray.push(followers.users[i].screen_name);
          }

          // console.log(followerArray);

          return followerArray;
        })
        .catch(error => {
          throw error;
        });
    })
    .catch(error => error);
}

async function getRawTweets(handle, consumerKey, consumerSecret) {
  const url = 'statuses/user_timeline';

  const oauth2 = new OAuth2(
    consumerKey,
    consumerSecret,
    'https://api.twitter.com/',
    null,
    'oauth2/token',
    null
  );

  return new Promise(resolve => {
    oauth2.getOAuthAccessToken(
      '',
      {
        grant_type: 'client_credentials',
      },
      (error, accessToken) => {
        resolve(accessToken);
      }
    );
  })
    .then(accessToken => {
      const client = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        bearer_token: accessToken,
      });

      const params = { screen_name: handle };

      return client
        .get(url, params)
        .then(tweets => {
          const tweetArray = [];
          let listOfTweets;

          return getFollowers(handle, consumerKey, consumerSecret).then(
            data => {
              if (tweets.length >= 1) {
                listOfTweets = {
                  name: tweets[0].user.name,
                  handle: tweets[0].user.screen_name,
                  location: tweets[0].user.location,
                  description: tweets[0].user.description,
                  followers_count: tweets[0].user.followers_count,
                  friends_count: tweets[0].user.friends_count,
                  favourites_count: tweets[0].user.favourites_count,
                  followers: data,
                  tweets: [],
                };
              }

              for (let i = 0; i < tweets.length; i += 1) {
                const t = {
                  tweet: tweets[i].text,
                  tweet_id: tweets[i].id_str,
                  favorited: tweets[i].favorited,
                  retweeted: tweets[i].retweeted,
                  retweet_count: tweets[i].retweet_count,
                };

                tweetArray.push(t);
              }

              tweetArray.sort((a, b) => b.retweet_count - a.retweet_count);

              const [topTweet] = tweetArray;
              listOfTweets.topTweet = topTweet;
              listOfTweets.tweets = tweetArray;
              return listOfTweets;
            }
          );
        })
        .catch(error => {
          throw error;
        });
    })
    .catch(error => error);
}

async function postTweet(
  tweet,
  consumerKey,
  consumerSecret,
  accessTokenKey,
  accessTokenSecret
) {
  const url = 'statuses/update';

  const client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret,
  });

  const params = { status: tweet };

  return client
    .post(url, params)
    .then(response => {
      console.log(response);

      return {
        tweet: response.text,
        tweet_id: response.id_str,
        retweeted: false,
        retweet_count: 0,
        favorited: false,
      };
    })
    .catch(error => {
      throw error;
    });
}

async function deleteTweet(
  tweetId,
  consumerKey,
  consumerSecret,
  accessTokenKey,
  accessTokenSecret
) {
  const url = 'statuses/destroy';

  const client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret,
  });

  const params = { id: tweetId };

  return client
    .post(url, params)
    .then(tweet => {
      console.log(tweet);

      return {
        tweet: tweet.text,
        tweet_id: tweet.id_str,
        retweeted: tweet.retweeted,
        retweet_count: tweet.retweet_count,
        favorited: tweet.favorited,
      };
    })
    .catch(error => {
      throw error;
    });
}

async function reTweet(
  tweetId,
  consumerKey,
  consumerSecret,
  accessTokenKey,
  accessTokenSecret
) {
  const url = 'statuses/retweet';

  const client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret,
  });

  const params = { id: tweetId };

  return client
    .post(url, params)
    .then(tweet => {
      console.log(tweet);

      return {
        tweet: tweet.text,
        tweet_id: tweet.id_str,
        retweeted: tweet.retweeted,
        retweet_count: tweet.retweet_count,
        favorited: tweet.favorited,
      };
    })
    .catch(error => {
      throw error;
    });
}

exports.graphqlHandler = (event, context, callback) => {
  console.log('Received event {}', JSON.stringify(event, 3));

  const consumerKey = event.arguments.consumer_key;
  const consumerSecret = event.arguments.consumer_secret;

  console.log('Got an Invoke Request.');
  switch (event.field) {
    case 'getUserTwitterFeed': {
      getRawTweets(event.arguments.handle, consumerKey, consumerSecret).then(
        result => {
          callback(null, result);
        }
      );

      break;
    }
    case 'createTweet': {
      postTweet(
        event.arguments.tweet,
        consumerKey,
        consumerSecret,
        event.arguments.access_token_key,
        event.arguments.access_token_secret
      ).then(result => {
        callback(null, result);
      });

      break;
    }
    case 'deleteTweet': {
      deleteTweet(
        event.arguments.tweet_id,
        consumerKey,
        consumerSecret,
        event.arguments.access_token_key,
        event.arguments.access_token_secret
      ).then(result => {
        callback(null, result);
      });

      break;
    }
    case 'reTweet': {
      reTweet(
        event.arguments.tweet_id,
        consumerKey,
        consumerSecret,
        event.arguments.access_token_key,
        event.arguments.access_token_secret
      ).then(result => {
        callback(null, result);
      });

      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};

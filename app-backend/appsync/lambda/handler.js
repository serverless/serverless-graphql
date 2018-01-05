import 'babel-polyfill';
import fetch from 'node-fetch';
import { OAuth2 } from 'oauth';
const Twitter = require('twitter');

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
        .then(function(tweets) {
          console.log(tweets);
          const tweetArray = [];
          let listOfTweets;

          if (tweets.length >= 1) {
            listOfTweets = {
              name: tweets[0].user.name,
              screen_name: tweets[0].user.screen_name,
              location: tweets[0].user.location,
              description: tweets[0].user.description,
              followers_count: tweets[0].user.followers_count,
              friends_count: tweets[0].user.friends_count,
              favourites_count: tweets[0].user.favourites_count,
              posts: [],
            };
          }

          for (let i = 0; i < tweets.length; i += 1) {
            tweetArray.push({ tweet: tweets[i].text });
          }

          listOfTweets.posts = tweetArray;

          console.log(listOfTweets);
          return listOfTweets;
        })
        .catch(function(error) {
          throw error;
        });
    })
    .catch(error => error);
}

async function postTweet(
  post,
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

  const params = { status: post };

  return client
    .post(url, params)
    .then(function(tweet) {
      console.log(tweet);
      const response = {
        screen_name: tweet.user.name,
        post: tweet.text,
      };

      return response;
    })
    .catch(function(error) {
      throw error;
    });
}

exports.graphqlHandler = (event, context, callback) => {
  console.log('Received event {}', JSON.stringify(event, 3));

  const consumerKey = event.arguments.consumer_key;
  const consumerSecret = event.arguments.consumer_secret;

  console.log('Got an Invoke Request.');
  switch (event.field) {
    case 'getTwitterFeed': {
      getRawTweets(event.arguments.handle, consumerKey, consumerSecret).then(
        result => {
          callback(null, result);
        }
      );

      break;
    }
    case 'createUserTweet': {
      postTweet(
        event.arguments.post,
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

import 'babel-polyfill';
import fetch from 'node-fetch';
import { OAuth2 } from 'oauth';

async function getRawTweets(handle, consumerKey, consumerSecret) {
  const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${
    handle
  }`;
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
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      return fetch(url, options)
        .then(res => res.json())
        .then(res => {
          const tweets = [];
          let listOfTweets;

          if (res.length >= 1) {
            listOfTweets = {
              name: res[0].user.name,
              screen_name: res[0].user.screen_name,
              location: res[0].user.location,
              description: res[0].user.description,
              followers_count: res[0].user.followers_count,
              friends_count: res[0].user.friends_count,
              favourites_count: res[0].user.favourites_count,
              posts: [],
            };
          }

          for (let i = 0; i < res.length; i += 1) {
            tweets.push({ tweet: res[i].text });
          }

          listOfTweets.posts = tweets;

          return listOfTweets;
        })
        .catch(error => error);
    })
    .catch(error => error);
}

async function postTweet(post, consumerKey, consumerSecret) {
  const url = 'https://api.twitter.com/1.1/statuses/update.json';

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
      const postBody = {
        status: post,
      };

      const options = {
        method: 'POST',
        body: postBody,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      return fetch(url, options)
        .then(res => res.json())
        .then(res => {
          const tweet = {
            screen_name: res.user.name,
            post: res.text,
          };

          return tweet;
        })
        .catch(error => error);
    })
    .catch(error => error);
}

exports.graphqlHandler = (event, context, callback) => {
  console.log('Received event {}', JSON.stringify(event, 3));

  const consumerKey = event.arguments.consumer_key;
  const consumerSecret = event.arguments.consumer_secret;

  console.log('Got an Invoke Request.');
  switch (event.field) {
    case 'getTwitterFeed': {
      const { handle } = event.arguments.handle;

      getRawTweets(handle, consumerKey, consumerSecret).then(result => {
        callback(null, result);
      });

      break;
    }
    case 'createUserTweet': {
      const { post } = event.arguments.post;

      postTweet(post, consumerKey, consumerSecret).then(result => {
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

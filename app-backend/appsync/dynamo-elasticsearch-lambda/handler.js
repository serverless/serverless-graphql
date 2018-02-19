import 'babel-polyfill';
import { OAuth2 } from 'oauth';

const Twitter = require('twitter');

async function getFavouritesCount(handle, consumerKey, consumerSecret) {
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
        .then(info => {
          const favouritesCount = info[0].user.favourites_count;
          console.log(favouritesCount);
          return favouritesCount;
        })
        .catch(error => {
          throw error;
        });
    })
    .catch(error => error);
}

exports.graphqlHandler = (event, context, callback) => {
  console.log('Received event {}', JSON.stringify(event, 3));

  const consumerKey = event.arguments.consumer_key;
  const consumerSecret = event.arguments.consumer_secret;

  console.log('Got an Invoke Request.');
  switch (event.field) {
    case 'favourites_count': {
      const handle = event.arguments.handle
        ? event.arguments.handle
        : event.handle;
      console.log(handle);

      getFavouritesCount(handle, consumerKey, consumerSecret).then(result => {
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

const fetch = require('node-fetch');
const { OAuth2 } = require('oauth');

require('babel-polyfill');

const twitterEndpoint = {
  async getRawTweets(args) {
    const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${
      args.handle
    }`;
    const oauth2 = new OAuth2(
      args.consumer_key,
      args.consumer_secret,
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
          // console.log(access_token);
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
  },
};

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getTwitterFeed: (root, args) => twitterEndpoint.getRawTweets(args),
  },
};

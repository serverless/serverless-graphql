const OAuth2 = require('OAuth').OAuth2;

const twitterEndpoint = {
  async getRawTweets(args) {
    const url =
      'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' +
      args.handle;
    const oauth2 = new OAuth2(
      args.consumer_key,
      args.consumer_secret,
      'https://api.twitter.com/',
      null,
      'oauth2/token',
      null
    );

    return await new Promise((resolve, reject) => {
      oauth2.getOAuthAccessToken(
        '',
        {
          grant_type: 'client_credentials',
        },
        function(err, access_token) {
          //console.log(access_token);
          resolve(access_token);
        }
      );
    })
      .then(access_token => {
        console.log(access_token);
        const options = {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        };
        console.log(options);
        return fetch(url, options)
          .then(res => res.json())
          .then(res => {
            const arrayTweets = [];

            for (let i = 0; i < res.length; i++) {
              let tweet = {
                tweet: res[i].text,
                name: res[i].user.name,
                screen_name: res[i].user.screen_name,
                location: res[i].user.location,
                description: res[i].user.description,
                followers_count: res[i].user.followers_count,
                friends_count: res[i].user.friends_count,
              };

              arrayTweets.push(tweet);
            }
            console.log(arrayTweets);

            return arrayTweets;
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(function(err) {
        return null;
      });
  },
};

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getTwitterFeed: async (root, args) => twitterEndpoint.getRawTweets(args),
  },
};

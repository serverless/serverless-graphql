import { OAuth2 } from 'oauth';

const Twitter = require('twitter');

async function getFollowing(handle, consumerKey, consumerSecret) {
  const url = 'friends/list';

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

async function getUserTweets(args) {
  const url = 'statuses/user_timeline';

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
        resolve(accessToken);
      }
    );
  })
    .then(accessToken => {
      const client = new Twitter({
        consumer_key: args.consumer_key,
        consumer_secret: args.consumer_secret,
        bearer_token: accessToken,
      });

      const params = { screen_name: args.handle };

      return client
        .get(url, params)
        .then(tweets => {
          const tweetArray = [];
          let listOfTweets;

          return getFollowing(
            args.handle,
            args.consumer_key,
            args.consumer_secret
          ).then(data => {
            if (tweets.length >= 1) {
              listOfTweets = {
                name: tweets[0].user.name,
                handle: tweets[0].user.screen_name,
                location: tweets[0].user.location,
                description: tweets[0].user.description,
                followers_count: tweets[0].user.followers_count,
                friends_count: tweets[0].user.friends_count,
                favourites_count: tweets[0].user.favourites_count,
                following: data,
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
            listOfTweets.tweets = { items: tweetArray };

            return listOfTweets;
          });
        })
        .catch(error => {
          throw error;
        });
    })
    .catch(error => error);
}

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getUserInfo: (root, args) => getUserTweets(args),
  },
};

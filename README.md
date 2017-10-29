# Serverless GraphQL

This starter kit is an opinionated set of tools combined to help you get started building a Serverless application with an GraphQL endpoint and deploy them to production in minutes.

This example uses the following technologies:

- Frontend
	- Apollo Client
	- React

- Backend
	- Serverless
	- AWS Lambda & AWS API Gateway
	- Apollo Lambda Server
	- Serverless Webpack
	- Serverless Offline

## System Architecture

![serverless application architecture v2](https://user-images.githubusercontent.com/1587005/30748634-c155b978-9f65-11e7-99d1-ebe7dafd0d6b.png)

## Quick Setup

You need to have Node 6 or higher installed.

```
npm install -g serverless
npm install -g yarn
```

Install Dependencies.
```
yarn install-dependencies
```

## Quick Start (Serverless Offline)

1. Start Backend
```
cd app-backend
yarn run start-server-lambda:offline
```

2. Start FrontEnd

```
cd app-backend
yarn run start-client-local
```

3. Start GraphiQL

```
http://localhost:4000/graphiql
```

4. Start Client

```
http://localhost:3000
```

## Setup for Production

Configure your AWS keys. Here you can find a [2min walkthrough](https://www.youtube.com/watch?v=mRkUnA3mEt4) how to do retrieve the keys.

```
sls config credentials --provider aws --key <your_aws_access_key> --secret <your_aws_secret_key>
```


Use live data from the development environment. You need to make sure you have access to your deployed lambda functions. This works only after you deployed it to production.

```
cd app-backend
yarn run deploy-server-lambda-prod
```

![deploy feedback](https://cloud.githubusercontent.com/assets/223045/19171420/6e271150-8bd1-11e6-9b49-e9fa88cac379.png)


## Example Query

Introspection Query:

```
{
  __type(name: "Tweets") {
    name
    kind
    fields{
      name
      type{
        name
        kind
        ofType{
          name
          kind
        }
      }
    }
  }
}
```

Sample Query:

note: consumer_key and consumer_secret are present in config/security.env.local
```
{
  getTwitterFeed(handle:"sidg_sid", consumer_key:"xxx", consumer_secret:"xxx"){
    name
    screen_name
    location
    description
    followers_count
    friends_count
    favourites_count
    posts{
      tweet
    }
  }
}
```

## Directory Layout

```bash
.
├── /app-client/                     # React Client with Apollo Integration
│   ├── /public/                     # front End Utils
│   │   ├── /index.html              # main html file to render react app
│   │   ├── /...                     # front end metadata
│   ├── /src/                        # react app code logic
│   │   ├── /componenets/            # react componenets
│   │   ├── /App.js                  # react application logic
│   │   ├── /index.js                # react dom render
│   │   ├── /...                     # etc.
│   ├── /package.json                # react app dependencies
├── /app-backend/                    # Server Backend with Apollo Integration
│   ├── /handler.js                  # AWS Lambda - Apollo Lambda Server
│   ├── /package.js                  # server side dependencies
│   ├── /resolvers.js                # graphql resolvers
│   ├── /schema.js                   # graphql schema
│   ├── /serverless.yaml             # Serverless yaml for AWS deployment
│   ├── /webpack.config.js           # Webpack server side code with ES6
├── /config/                         # Configuration files
│   ├── /security.env.local          # local config
│   ├── /security.env.prod           # production config
```

## Webpack and Babel

Todo

## Who uses Serverless GraphQL Apollo?

As the Serverless GraphQL Apollo community grows, we'd like to keep track of who is using the platform. Please send a PR with your company name and @githubhandle if you may.

Currently **officially** using Serverless GraphQL Apollo :

1. Serverless (@nikgraf)
2. Glassdoor (@sid88in)

![happy]()


## Send us your feedback

[Feeback](https://giphy.com/gifs/dog-confused-i-have-no-idea-what-im-doing-xDQ3Oql1BN54c)

Send your feedback at: [@nikgraf](https://twitter.com/nikgraf), [@sidg_sid](https://twitter.com/sidg_sid)

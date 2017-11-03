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

![serverless application architecture v2](https://user-images.githubusercontent.com/1587005/32188725-d9508436-bd65-11e7-81eb-e25c1c3f5192.png)

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


You need to make sure you have access to your deployed lambda functions.

1. Deploy Serverless Resources to your AWS Account
```
cd app-backend
yarn run deploy-server-lambda-prod
```

2. Get your /graphql url after deployment and use it in config/security.env.prod 
![deploy feedback](https://user-images.githubusercontent.com/1587005/32140859-eb61d1dc-bc2c-11e7-9ab4-23790ffa917a.png)


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

## Usage of GraphQL Playground
To use the GraphQL Playground, open `/playground` of your Serverless service. With serverless offline it is `http://localhost:4000/playground`.
![playground](https://i.imgur.com/QPbIstr.png)


## Webpack and Babel

Todo

## Who uses Serverless GraphQL Apollo?

As the Serverless GraphQL Apollo community grows, we'd like to keep track of who is using the platform. Please send a PR with your company name and @githubhandle if you may.

Currently **officially** using Serverless GraphQL Apollo :

1. Serverless [@nikgraf](https://github.com/nikgraf)
2. Glassdoor [@sid88in](https://github.com/sid88in)

## Feedback

![](http://www.reactiongifs.com/wp-content/uploads/2013/11/I-have-no-idea-what-I-am-doing.gif)

Send your questions or feedback at: [@nikgraf](https://twitter.com/nikgraf), [@sidg_sid](https://twitter.com/sidg_sid)

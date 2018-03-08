# Introduction

> *Part 1:* [Running a scalable & reliable GraphQL endpoint with Serverless](https://serverless.com/blog/running-scalable-reliable-graphql-endpoint-with-serverless/)  
> *Part 2:* [AppSync Backend: AWS Managed GraphQL Service](https://medium.com/@sid88in/running-a-scalable-reliable-graphql-endpoint-with-serverless-24c3bb5acb43)  
> *Part 3:* AppSync Frontend: AWS Managed GraphQL Service (Coming Soon!!!)

# Serverless GraphQL

This starter kit is an opinionated set of tools combined to help you get started building a Serverless application with an GraphQL endpoint and deploy them to production in minutes.

This example uses the following technologies:

- Frontend
  - [AWSAppSyncClient](http://docs.aws.amazon.com/appsync/latest/devguide/building-a-client-app-react.html)
  - [Apollo Client 2.0](https://github.com/apollographql/apollo-client)
  - [React App](https://github.com/facebookincubator/create-react-app)
  - [GraphiQL](https://github.com/graphql/graphiql)
  - [GraphQL Playground (GraphiQL replacement)](https://github.com/graphcool/graphql-playground)
  - [Netlify Integration](https://www.netlify.com/)

- Backend
  - [Serverless](https://serverless.com/framework/docs/)
  - [AWS AppSync](https://aws.amazon.com/appsync/) DynamoDB, Elasticsearch and Lambda Integrations
  - [AWS Lambda](https://aws.amazon.com/lambda/) & [AWS API Gateway](https://aws.amazon.com/documentation/apigateway/)
  - [Apollo Lambda GraphQL Server](https://www.npmjs.com/package/apollo-server-lambda)
  - [DynamoDB](https://aws.amazon.com/dynamodb/)
  - [RDS (MySQL, PostGres and Aurora)](https://aws.amazon.com/rds/)
  - [REST API](https://developer.twitter.com/en/docs)
  - Plugins
      - [Serverless Appsync Plugin](https://github.com/sid88in/serverless-appsync-plugin)
      - [Serverless Webpack](https://github.com/serverless-heaven/serverless-webpack)
      - [Serverless Offline](https://github.com/dherault/serverless-offline)
      - [Serverless DynamoDB Local](https://github.com/99xt/serverless-dynamodb-local)
      - [Serverless DynamoDB Client](https://www.npmjs.com/package/serverless-dynamodb-client)
      - [Serverless Finch](https://www.npmjs.com/package/serverless-finch)

- Other Utilities and Integrations
    - [Faker](https://www.npmjs.com/package/faker)
    - [Prettier](https://github.com/prettier/prettier)
    - [Apollo Tracing](https://github.com/apollographql/apollo-tracing)

## System Architecture

![serverless application architecture v2](https://user-images.githubusercontent.com/1587005/36063546-21c3a540-0e33-11e8-9fa4-1a1e5e9a6537.png)

## Quick Setup

You need to have Node 6 or higher installed.

```
npm install -g serverless
npm install -g yarn
npm install -g netlify-cli
```

Install Dependencies.
```
yarn install
```

## Feature Support in this repository

![feature_support](https://user-images.githubusercontent.com/1587005/35409562-6fd6dd1a-01c7-11e8-9467-321deb9a56b1.png)

## Quick Start (Serverless Offline)
Please note: [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) is required to be installed on your system

1. **Select Backend** 

- *AWS Appsync* (Serverless Offline does not support Appsync at this point)

    - AWS DynamoDB
    - AWS ElasticSearch
    - AWS Lambda

- *Lambda Backend* (Serverless Offline Supported)
    
    - *Twitter Rest API*
        ```
        cd app-backend/rest-api
        yarn start
        ```

    - *DynamoDB*
        ```
        cd app-backend/dynamodb
        yarn start
        ```

    - *RDS*
        ```
        cd app-backend/rds
        yarn start
        ```

2. **Start FrontEnd** (Apollo Client or Appsync Client)

- For Appsync Backend please select Appsync Client Integration:

    ```
    cd app-client/appsync-client/
    yarn start
    ```

- For Lambda Backend please select Apollo Client Integration:

    ```
    cd app-client/apollo-client/
    yarn start
    ```

Also, please make sure GraphQL endpoint is configured correctly in config/security.env.local to run client on local.

3. **Start GraphiQL**
```
http://localhost:4000/graphiql
```

4. **Start GraphQL Playground (GraphiQL replacement - coming soon)**
```
http://localhost:4000/playground
```

If you've followed me this far, DynamoDB will now be available and running on your local machine at `http://localhost:8000/shell`:

![!Live Example](https://user-images.githubusercontent.com/1587005/36065162-b4ad3c14-0e4b-11e8-8776-e19596546ce1.gif)


## Setup for Production (Deploy resources to AWS)

Configure your AWS keys. Here you can find a [2min walkthrough](https://www.youtube.com/watch?v=mRkUnA3mEt4) how to do retrieve the keys.

```
sls config credentials --provider aws --key <your_aws_access_key> --secret <your_aws_secret_key>
```

![!Live Example](https://user-images.githubusercontent.com/1587005/36068493-de82620e-0e8b-11e8-887b-e1593cd3c8cc.gif)

You need to make sure you have access to your deployed lambda functions.

1. **Select Backend** 

- *AWS Appsync* (Supported by [Serverless-AppSync-Plugin](https://github.com/sid88in/serverless-appsync-plugin))

**Note** Please make sure latest serverless package is installed `npm install -g serverless@latest`

To use aws appsync you will need to create cognito user pool to authenticate the API [Reference](https://serverless-stack.com/chapters/create-a-cognito-user-pool.html)

    - AWS DynamoDB
        cd app-backend/appsync/dynamodb
        yarn deploy-prod
        yarn deploy-appsync
                
    - AWS ElasticSearch
        
        cd app-backend/appsync/dynamo-elasticsearch-lambda
        yarn deploy-prod
        yarn deploy-appsync
                
    - AWS Lambda
        
        cd app-backend/appsync/lambda
        yarn deploy-prod
        yarn deploy-appsync
        
- *Lambda Backend* (Serverless Offline Supported)

    - *Twitter Rest API*
        ```
        cd app-backend/rest-api
        yarn deploy-prod
        ```
    
    - *DynamoDB*
        ```
        cd app-backend/dynamodb
        yarn deploy-prod
        ```
    
    - *RDS*
      - Create RDS Instance. For example - [PostGres Tutorial](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html#CHAP_GettingStarted.Creating.PostgreSQL)
     
      - Please make sure connectivity to production RDS instance works (For example: test via razersql)
      
      - Edit the `config/security.env.prod` file and replace the `DATABASE_URL` variable with your amazon rds endpoint (eg: postgres://${username}:{password}@${endpoint):5432/${dbName}).
    
      - Run the deployment command
          ```
          cd app-backend/rds
          yarn deploy-prod
          ```

2. **Config**: Get your /graphql POST endpoint as shown below and use it in config/security.env.prod  **NOTE** Please remove all quotes and <> and place only your POST endpoint url otherwise you will get 405 method not allowed error on POST to your endpoint

![deploy feedback](https://user-images.githubusercontent.com/1587005/32410402-351ff868-c17c-11e7-9bfb-e39f7e8c14a3.png)


3. **Select Frontend** (apollo-client or appsync-client)

- Note: 
    - For lambda please use apollo-client
    - For appsync backend please use appsync-client
    - Please note that backend is deployed before deploying frontend.
    - You can deploy the client on AWS S3 or Netlify.    

- *AWS S3*

  - First you will need to choose custom s3 bucket name for client. For ex: s3-firstname-serverless-graphql. Please note that bucket name must be unique across all aws buckets.

  - Now, in `app-client/<client-name>/serverless.yml` edit the `custom.client.bucketName` property and replace it the bucket name above.

  - Now, in `app-client/<client-name>/package.json` edit the `homepage` property with `https://${yourBucketName}.s3-website-us-east-1.amazonaws.com`. For ex: https://s3-bucketname-serverless-graphql.s3-website-us-east-1.amazonaws.com

  - Run the deployment command
      ```
      cd app-client/<client-name>/
      yarn deploy-s3
      # Your deployment url will be printed on the console
      ```
  - Your deployment url will be : https://s3.amazonaws.com/[bucket-name]/index.html   
      
- *Netlify*

  - First you will need to create a new account. Please see https://www.netlify.com/docs/cli/ for details.

  - Remove homepage property in `app-client/<client-name>/package.json`. This property is not required while deploying to netlify but is required for aws s3 deployment.

  - The first time you use the cli tool, you’ll be asked to authenticate through the browser. After you authenticate netlify will store an access token in a global ~/.netlify/config

  - Run deployment command

      ```
      cd app-client/<client-name>/
      yarn deploy-netlify
      ```

      - ? No site id specified, create a new site (Y/n) Y
      - ? Path to deploy? (current dir) build    

  - Your deployment url will be printed on the console

## Example: Appsync Backend Integration

- GraphQL Schema:

```graphql
type Mutation {
	# Create a tweet for a user
	# consumer keys and tokens are not required for dynamo integration
	createTweet(
		tweet: String!,
		consumer_key: String,
		consumer_secret: String,
		access_token_key: String,
		access_token_secret: String,
		created_at: String!
	): Tweet!

	# Delete User Tweet
	deleteTweet(
	    tweet_id: String!,
	    consumer_key: String,
        consumer_secret: String,
        access_token_key: String,
        access_token_secret: String
    ): Tweet!

	# Retweet existing Tweet
	reTweet(
	    tweet_id: String!,
	    consumer_key: String,
        consumer_secret: String,
        access_token_key: String,
        access_token_secret: String
    ): Tweet!

	# Update existing Tweet
	updateTweet(tweet_id: String!, tweet: String!): Tweet!

    # Create user info is available in dynamo integration
	updateUserInfo(
		location: String!,
		description: String!,
		name: String!,
		followers_count: Int!,
		friends_count: Int!,
		favourites_count: Int!,
		followers: [String!]!
	): User!
}

type Query {
	meInfo(consumer_key: String, consumer_secret: String): User!
	getUserInfo(handle: String!, consumer_key: String, consumer_secret: String): User!

	# search functionality is available in elasticsearch integration
	searchAllTweetsByKeyword(keyword: String!): TweetConnection
}

type Subscription {
	addTweet: Tweet
		@aws_subscribe(mutations: ["createTweet"])
}

type Tweet {
	tweet_id: String!
	tweet: String!
	retweeted: Boolean
	retweet_count: Int
	favorited: Boolean
	created_at: String!
}

type TweetConnection {
	items: [Tweet!]!
	nextToken: String
}

type User {
	name: String!
	handle: String!
	location: String!
	description: String!
	followers_count: Int!
	friends_count: Int!
	favourites_count: Int!
	followers: [String!]!
	topTweet: Tweet
	tweets(limit: Int!, nextToken: String): TweetConnection

	# search functionality is available in elasticsearch integration
    searchTweetsByKeyword(keyword: String!): TweetConnection
}

schema {
	query: Query
	mutation: Mutation
	subscription: Subscription
}
```

- GraphQL Query:

![query](https://user-images.githubusercontent.com/1587005/35409243-786b52d6-01c6-11e8-85c1-5f9572e3db04.gif)


## Directory Layout

```bash
.
├── /app-client/                             # React JS Client Integrations
│   ├── /appsync-client                         # Appsync Client Itegrations
│   │   ├── /public/                            # front End Utils
│   │   │   ├── /index.html                     # main html file to render react app
│   │   │   ├── /...                            # front end metadata
│   │   ├── /src/                               # react app code logic
│   │   │   ├── /components/                    # react components
│   │   │   ├── /App.js                         # react application logic
│   │   │   ├── /index.js                       # react dom render
│   │   │   ├── /aws-exports.js                 # AWS Authentication
│   │   │   ├── /...                            # etc.
│   │   ├── /package.json                       # react app dependencies
│   │   ├── /serverless.yml                     # Serverless yaml for AWS deployment
│   ├── /apollo-client                       # Apollo Client Itegrations
│   │   ├── /public/                            # front End Utils
│   │   │   ├── /index.html                     # main html file to render react app
│   │   │   ├── /...                            # front end metadata
│   │   ├── /src/                               # react app code logic
│   │   │   ├── /components/                    # react components
│   │   │   ├── /App.js                         # react application logic
│   │   │   ├── /index.js                       # react dom render
│   │   │   ├── /...                            # etc.
│   │   ├── /package.json                       # react app dependencies
│   │   ├── /serverless.yml                     # Serverless yaml for AWS deployment
├── /app-backend/                            # Server Backend Integrations
├   ├── /appsync/                               # AWS Appsync Integrations
├   ├   ├── /dynamodb/*                         # AWS Appsync Dynamodb 
├   ├   ├── /elasticsearch/*                    # AWS Appsync Elasticsearch
├   ├   ├── /lambda/                            # AWS Appsync Lambda
│   ├── /dynamodb                            # Integration with DynamodDB Backend
│   │   ├── /seed-data/                         # seed test data
│   │   │   ├── /create_seed_data.js            # Create Seed data to be inserted in dynamodb local and remote
│   │   │   ├── /insert_seed_data_prod.js       # Insert seed data in aws dynamodb (serverless)
│   │   │   ├── /sample-query.txt               # Test Query on DynamoDB Local Client http://localhost:8000
│   │   ├── /handler.js                         # AWS Lambda - Apollo Lambda Server
│   │   ├── /package.js                         # server side dependencies
│   │   ├── /resolvers.js                       # graphql resolvers
│   │   ├── /schema.js                          # graphql schema
│   │   ├── /serverless.yml                     # Serverless yaml for AWS deployment
│   │   ├── /webpack.config.js                  # Webpack server side code with ES6
│   ├── /rest-api                           # Integration with REST API Backend
│   │   ├── /handler.js                         # AWS Lambda - Apollo Lambda Server
│   │   ├── /package.js                         # server side dependencies
│   │   ├── /resolvers.js                       # graphql resolvers
│   │   ├── /schema.js                          # graphql schema
│   │   ├── /serverless.yml                     # Serverless yaml for AWS deployment
│   │   ├── /webpack.config.js                  # Webpack server side code with ES6
│   ├── /rds                                # Integrations for PostGres, MySQL and Aurora Backend
│   │   ├── /seed-data/                         # seed test data
│   │   │   ├── /create_seed_data.js            # Create Seed data to be inserted in dynamodb local and remote
│   │   │   ├── /seed_local.js                  # Insert seed data in aws dynamodb (serverless)
│   │   │   ├── /seed_prod.js                   # Test Query on DynamoDB Local Client http://localhost:8000
│   │   ├── /migrations/                        # Create DDL statements
│   │   ├── /knexfile.js                        # Database Configurations 
│   │   ├── /handler.js                         # AWS Lambda - Apollo Lambda Server
│   │   ├── /package.js                         # server side dependencies
│   │   ├── /resolvers.js                       # graphql resolvers
│   │   ├── /schema.js                          # graphql schema
│   │   ├── /serverless.yml                     # Serverless yaml for AWS deployment
│   │   ├── /webpack.config.js                  # Webpack server side code with ES6
├── /config/                                # Configuration files
│   ├── /security.env.local                     # local config
│   ├── /security.env.prod                      # production config
```

## Coming Soon

1. Schema Stitching
2. Lambda Backend: GraphCool, Druid
3. Aggregations at Scale - Druid
4. Lambda Backend: Authentication and Authorization
5. Lambda Backend: Pagination
6. Swagger Integration
7. Integration with Azure, IBM and Google Coud

## Who uses Serverless GraphQL Apollo?

As the Serverless GraphQL Apollo community grows, we'd like to keep track of who is using the platform. Please send a PR with your company name and @githubhandle if you may.

Currently **officially** using Serverless GraphQL Apollo :

1. Serverless [@nikgraf](https://github.com/nikgraf)
2. Glassdoor [@sid88in](https://github.com/sid88in)
3. [@pradel](https://github.com/pradel)
4. EMC School [@JstnEdr](https://github.com/JstnEdr)

## Feedback

![](http://www.reactiongifs.com/wp-content/uploads/2013/11/I-have-no-idea-what-I-am-doing.gif)

Send your questions or feedback at: [@nikgraf](https://twitter.com/nikgraf), [@sidg_sid](https://twitter.com/sidg_sid)

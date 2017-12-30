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
  - [RDS](https://aws.amazon.com/rds/)
  - [REST API](https://developer.twitter.com/en/docs)
  - Plugins
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

![serverless application architecture v2](https://user-images.githubusercontent.com/1587005/34456668-8402b764-edc2-11e7-95b8-bf5c75581af7.png)

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

## Quick Start (Serverless Offline)
Please note: AWS CLI is required to be installed on your system

1. **Select Backend** (Twitter Rest API / DynamoDB / RDS (MySQL, PostGres or Aurora)

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

```
cd app-client/<client-name>/
yarn start
```

3. **Start GraphiQL**
```
http://localhost:4000/graphiql
```

4. **Start GraphQL Playground (GraphiQL replacement - coming soon)**
```
http://localhost:4000/playground
```


## Setup for Production

Configure your AWS keys. Here you can find a [2min walkthrough](https://www.youtube.com/watch?v=mRkUnA3mEt4) how to do retrieve the keys.

```
sls config credentials --provider aws --key <your_aws_access_key> --secret <your_aws_secret_key>
```


You need to make sure you have access to your deployed lambda functions.

1. **Select Backend** (Twitter Rest API / DynamoDB / RDS). Deploy Serverless Resources to your AWS Account
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

2. **Config**: Get your /graphql POST endpoint as shown below and use it in config/security.env.prod

![deploy feedback](https://user-images.githubusercontent.com/1587005/32410402-351ff868-c17c-11e7-9bfb-e39f7e8c14a3.png)


3. **Select Frontend** (apollo-client or appsync-client)


- Note: 
    - Please note that backend is deployed before deploying frontend.
    - You can deploy the client on AWS S3 or Netlify.

- *AWS S3*

  - First you will need to choose custom s3 bucket name for client. For ex: s3-firstname-serverless-graphql-apollo. Please note that bucket name must be unique across all aws buckets.

  - Now, in `app-client/<client-name>/serverless.yml` edit the `custom.client.bucketName` property and replace it the bucket name above.

  - Now, in `app-client/<client-name>/package.json` edit the `homepage` property with `https://s3.amazonaws.com/${yourBucketName}`. For ex: https://s3.amazonaws.com/s3-firstname-serverless-graphql-apollo

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

# AppSync Integrations (NEW)

Install Dependencies.
```
yarn install-appsync
```

## Appsync DynamoDB Integration

## Schema:

```
type Query {
  getTwitterFeed(handle: String!): Tweets
}

type Subscription {
  subscribeToTweeterUser(handle: String!): Tweets
    @aws_subscribe(mutations: ["createUserRecord"])
}

type Tweet {
  tweet: String
}

type Mutation {
  # Create a single tweet.
  createUserRecord(
    name: String!,
    screen_name: String!,
    location: String!,
    description: String!,
    followers_count: Int!,
    friends_count: Int!,
    favourites_count: Int!,
    posts: [String]
  ): Tweets
}

type Tweets {
  name: String!
  screen_name: String!
  location: String!
  description: String!
  followers_count: Int!
  friends_count: Int!
  favourites_count: Int!
  posts: [Tweet]
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

```

## Query:

```
query{
    getTwitterFeed(handle: "Charles.Hills"){
        name
        location
        description
        screen_name
        followers_count
        friends_count
        favourites_count
        posts {
            tweet
        }
    }
}
```

## Mutation:

```
mutation add {
  createUserRecord(
    name:"Siddharth",
    screen_name:"sidg_sid",
    description:"cool guy",
    location: "new delhi",
    favourites_count: 100,
    friends_count: 100,
    followers_count: 50,
    posts: ["hello", "girl", "im good"]
  ){
    name
    screen_name
    description
    location
    favourites_count
    friends_count
    followers_count
    posts{
      tweet
    }
  }
}
```

## Resolver for Mutation - createUserRecord

```
## Request mapping template

{
    "version": "2017-02-28",
    "operation": "PutItem",
    "key": {
        "screen_name": { "S": "$context.arguments.screen_name"}
    },
    "attributeValues": {
        "name": { "S": "$context.arguments.name" },
        "location": { "S": "$context.arguments.location" },
        "description": { "S": "$context.arguments.description" },
        "followers_count": { "N": $context.arguments.followers_count },
        "friends_count": { "N": $context.arguments.friends_count },
        "favourites_count": { "N": $context.arguments.favourites_count },
        #set($tweetList = [])
        #set($temp = [])
        #foreach ( $post in $context.arguments.posts )
          #set( $element =
          ${tweetList.add(
          { "M" : {
                "tweet" : { "S"  : $post }
             }
          })}
          )
        #end
        "posts": { "L" : $utils.toJson($tweetList) }
    }
}

## Response mapping template
$util.toJson($context.result)

```

## Resolver for Query : getTwitterFeed

```
##Request mapping template

{
    "version": "2017-02-28",
    "operation": "GetItem",
    "key": {
        "screen_name": { "S": "$context.arguments.handle" }
    }
}

##Response mapping template

$util.toJson($context.result)
```

## Appsync ElasticSearch Integration

## Schema

```
type Query {
	getTwitterFeed(handle: String!): Tweets
}

type Tweet {
	tweet: String
}

type Tweets {
	name: String!
	screen_name: String!
	location: String!
	description: String!
	followers_count: Int!
	friends_count: Int!
	favourites_count: Int!
	posts: [Tweet]
}

schema {
	query: Query
}

```

## Resolver for Query - getTwitterFeed 
```
## Request mapping template
{
    "version":"2017-02-28",
    "operation":"GET",
    "path":"/user/twitter/_search",
    "params":{
        "body":{
            "from":0,
            "size":50,
            "query" : {
                "bool" : {
                    "should" : [
                        {"match" : { "screen_name" : "$context.arguments.handle" }}
                    ]
                }
            }
        }
    }
}


## Response mapping template

{
  #set($hitcount = $context.result.hits.total)
    #set($tweetList = [])
  #if($hitcount > 0)
        #foreach($entry in $context.result.hits.hits)
          #set( $element =
          ${tweetList.add(
          { "tweet" : $util.toJson("$entry.get('_source')['tweet']") }
          )}
          )
      #end
      "location" : $util.toJson("$context.result.hits.hits[0].get('_source')['location']"),
      "name" : $util.toJson("$context.result.hits.hits[0].get('_source')['name']"),
      "screen_name" : $util.toJson("$context.result.hits.hits[0].get('_source')['screen_name']"),
      "description" : $util.toJson("$context.result.hits.hits[0].get('_source')['description']"),
      "followers_count" : $util.toJson("$context.result.hits.hits[0].get('_source')['followers_count']"),
      "friends_count" : $util.toJson("$context.result.hits.hits[0].get('_source')['friends_count']"),
      "favourites_count" : $util.toJson("$context.result.hits.hits[0].get('_source')['favourites_count']"),
      "posts" : $util.toJson($tweetList)
    #else
      "location" : "",
      "name" : "",
      "screen_name" : "",
      "description" : "",
      "followers_count" : -1,
      "friends_count" : -1,
      "favourites_count" : -1
   #end
}
```

## Appsync Lambda Integration

## Schema
```
type Query {
	getTwitterFeed(handle: String!, consumer_key: String, consumer_secret: String): Tweets
}

type Tweet {
	tweet: String
}

type Tweets {
	name: String!
	screen_name: String!
	location: String!
	description: String!
	followers_count: Int!
	friends_count: Int!
	favourites_count: Int!
	posts: [Tweet]
}

schema {
	query: Query
}
```

## Resolver for Mutation - getTwitterFeed

```
## Request Mapping Template
{
    "version": "2017-02-28",
    "operation": "Invoke",
    "payload": {
        "field": "getTwitterFeed",
        "arguments":  $utils.toJson($context.arguments)
    }
}

## Response Mapping Template
$utils.toJson($context.result)
```


## Directory Layout

```bash
.
├── /app-client/                             # React JS Client Integrations
│   ├── /appsync-client                         # Appsync Client Itegrations
│   │   ├── /public/                            # front End Utils
│   │   │   ├── /index.html                     # main html file to render react app
│   │   │   ├── /...                            # front end metadata
│   │   ├── /src/                               # react app code logic
│   │   │   ├── /componenets/                   # react componenets
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
│   │   │   ├── /componenets/                   # react componenets
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
│   ├── /RDS                                # Integrations for PostGres, MySQL and Aurora Backend
│   │   ├── /seed-data/                         # seed test data
│   │   │   ├── /create_seed_data.js            # Create Seed data to be inserted in dynamodb local and remote
│   │   │   ├── /seed_local.js                  # Insert seed data in aws dynamodb (serverless)
│   │   │   ├── /seed_prod.js                   # Test Query on DynamoDB Local Client http://localhost:8000
│   │   ├── /migrations/                        # Create DDL statements
│   │   ├── /kenxfile                           # Database Configurations 
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

## Usage of GraphQL Playground
To use the GraphQL Playground, open `/playground` of your Serverless service. With serverless offline it is `http://localhost:4000/playground`. Why GraphQL Playground and not GraphiQL? [Refer FAQ](https://github.com/graphcool/graphql-playground)
![playground](https://user-images.githubusercontent.com/1587005/32695336-96dbbe16-c70d-11e7-96b9-c7ef4e9ba32c.gif)

## Usage of GraphiQL
 To use the GraphiQL, open `/graphiql` of your Serverless service. With serverless offline it is `http://localhost:4000/graphiql`.
 ![graphiql](https://user-images.githubusercontent.com/1587005/32695300-943e355e-c70c-11e7-9fac-2c9324a242c4.gif)

## Coming Soon

1. AppSync Integrations - DynamoDB, ES and Lambda
2. Backend Integrations - ElasticSearch, GraphCool
3. AWS X-Ray Integration
4. GraphQL Mutations and Subscriptions 
5. Schema Stitching
6. Aggregations at Scale - Druid, InfuxDB
7. Authentication and Authorization
8. Pagination
9. Swagger Integration
10. Data Loader
11. Caching and Prefetching
12. Integration with Azure, IBM and Google Coud

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

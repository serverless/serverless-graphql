# Serverless GraphQL

This starter kit is an opinionated set of tools combined to help you get started building a Serverless application with an GraphQL endpoint and deploy them to production in minutes.

This example uses the following technologies:

- Frontend
  - [AWSAppSyncClient (Apollo Client 2.0)](https://github.com/apollographql/apollo-client)
  - [React App](https://github.com/facebookincubator/create-react-app)
  - [GraphQL Playground (GraphiQL replacement)](https://github.com/graphcool/graphql-playground)

- Backend
  - [Serverless](https://serverless.com/framework/docs/)
  - [AWS Lambda](https://aws.amazon.com/lambda/) & [AWS API Gateway](https://aws.amazon.com/documentation/apigateway/)
  - [Apollo Lambda GraphQL Server](https://www.npmjs.com/package/apollo-server-lambda)
  - [DynamoDB](https://aws.amazon.com/dynamodb/)
  - Plugins
      - [Serverless Webpack](https://github.com/serverless-heaven/serverless-webpack)
      - [Serverless Offline](https://github.com/dherault/serverless-offline)
      - [Serverless DynamoDB Local](https://github.com/99xt/serverless-dynamodb-local)
      - [Serverless DynamoDB Client](https://www.npmjs.com/package/serverless-dynamodb-client)
      - [Serverless Finch](https://www.npmjs.com/package/serverless-finch)

- Utilities
    - [Faker](https://www.npmjs.com/package/faker)
    - [Prettier](https://github.com/prettier/prettier)

## System Architecture

![serverless application architecture v2](https://user-images.githubusercontent.com/1587005/33366373-f1394d52-d49f-11e7-8afe-e2b6fe2da14a.png)

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

1. **Select Backend** (Twitter Rest API or DynamoDB)

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

2. **Start FrontEnd**

```
cd app-client
yarn start
```

3. **Start GraphQL Playground (GraphiQL replacement)**

```
http://localhost:4000/playground
```

## Setup for Production

Configure your AWS keys. Here you can find a [2min walkthrough](https://www.youtube.com/watch?v=mRkUnA3mEt4) how to do retrieve the keys.

```
sls config credentials --provider aws --key <your_aws_access_key> --secret <your_aws_secret_key>
```


You need to make sure you have access to your deployed lambda functions.

1. **Select Backend** (Twitter Rest API or DynamoDB). Deploy Serverless Resources to your AWS Account
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

2. **Config**: Get your /graphql POST endpoint as shown below and use it in config/security.env.prod

![deploy feedback](https://user-images.githubusercontent.com/1587005/32410402-351ff868-c17c-11e7-9bfb-e39f7e8c14a3.png)


3. **Select Frontend** (AWS S3 or Netlify)

Note: Please note that backend is deployed before deploying frontend.

- *AWS S3*

  - First you will need to choose custom s3 bucket name for client. For ex: s3-firstname-serverless-graphql-apollo. Please note that bucket name must be unique across all aws buckets.

  - Now, in `app-client/serverless.yml` edit the `custom.client.bucketName` property and replace it the bucket name above.

  - Now, in `app-client/package.json` edit the `homepage` property with `https://s3.amazonaws.com/${yourBucketName}`. For ex: https://s3.amazonaws.com/s3-firstname-serverless-graphql-apollo

  - Run the deployment command
      ```
      cd app-client
      yarn deploy-s3
      # Your deployment url will be printed on the console
      ```

- *Netlify*

  - First you will need to create a new account. Please see https://www.netlify.com/docs/cli/ for details.

  - Remove homepage property in `app-client/package.json`. This property is not required while deploying to netlify but is required for aws s3 deployment.

  - The first time you use the cli tool, you’ll be asked to authenticate through the browser. After you authenticate netlify will store an access token in a global ~/.netlify/config

  - Run deployment command

      ```
      cd app-client
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

## Directory Layout

```bash
.
├── /app-client/                            # React Client with Apollo Integration
│   ├── /public/                            # front End Utils
│   │   ├── /index.html                     # main html file to render react app
│   │   ├── /...                            # front end metadata
│   ├── /src/                               # react app code logic
│   │   ├── /componenets/                   # react componenets
│   │   ├── /App.js                         # react application logic
│   │   ├── /index.js                       # react dom render
│   │   ├── /...                            # etc.
│   ├── /package.json                       # react app dependencies
│   ├── /serverless.yml                     # Serverless yaml for AWS deployment
├── /app-backend/                           # Server Backend with Apollo Integration
│   ├── /dynamodb
│   │   ├── /seed-data/                     
│   │   │   ├── /create_seed_data.js        # Create Seed data to be inserted in dynamodb local and remote
│   │   │   ├── /insert_seed_Data_prod.js   # Insert seed data in aws dynamodb (serverless)
│   │   │   ├── /sample-query.txt           # Test Query on DynamoDB Local Client http://localhost:8000
│   │   ├── /handler.js                     # AWS Lambda - Apollo Lambda Server
│   │   ├── /package.js                     # server side dependencies
│   │   ├── /resolvers.js                   # graphql resolvers
│   │   ├── /schema.js                      # graphql schema
│   │   ├── /serverless.yml                 # Serverless yaml for AWS deployment
│   │   ├── /webpack.config.js              # Webpack server side code with ES6
│   ├── /rest-api
│   │   ├── /handler.js                     # AWS Lambda - Apollo Lambda Server
│   │   ├── /package.js                     # server side dependencies
│   │   ├── /resolvers.js                   # graphql resolvers
│   │   ├── /schema.js                      # graphql schema
│   │   ├── /serverless.yml                 # Serverless yaml for AWS deployment
│   │   ├── /webpack.config.js              # Webpack server side code with ES6
├── /config/                                # Configuration files
│   ├── /security.env.local                 # local config
│   ├── /security.env.prod                  # production config
```

## Usage of GraphQL Playground
To use the GraphQL Playground, open `/playground` of your Serverless service. With serverless offline it is `http://localhost:4000/playground`. Why GraphQL Playground and not GraphiQL? [Refer FAQ](https://github.com/graphcool/graphql-playground)
![playground](https://user-images.githubusercontent.com/1587005/32695336-96dbbe16-c70d-11e7-96b9-c7ef4e9ba32c.gif)

## Coming Soon

1. Backend Integrations - MySQL, PostGres, ElasticSearch
2. Aggregations at Scale - Druid
3. GraphQL Subscriptions
4. GraphQL Mutations
5. Schema Stitching
6. Authentication and Authorization
7. Pagination
8. Swagger Integration
9. Data Loader
10. Caching and Prefetching
11. Integration with Azure, IBM and Google Coud

## Who uses Serverless GraphQL Apollo?

As the Serverless GraphQL Apollo community grows, we'd like to keep track of who is using the platform. Please send a PR with your company name and @githubhandle if you may.

Currently **officially** using Serverless GraphQL Apollo :

1. Serverless [@nikgraf](https://github.com/nikgraf)
2. Glassdoor [@sid88in](https://github.com/sid88in)
3. [@pradel](https://github.com/pradel)

## Feedback

![](http://www.reactiongifs.com/wp-content/uploads/2013/11/I-have-no-idea-what-I-am-doing.gif)

Send your questions or feedback at: [@nikgraf](https://twitter.com/nikgraf), [@sidg_sid](https://twitter.com/sidg_sid)

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

## Setup

You need to have Node 6 or higher installed.

```
npm install -g serverless
npm install -g yarn
```

Configure your AWS keys. Here you can find a [2min walkthrough](https://www.youtube.com/watch?v=mRkUnA3mEt4) how to do retrieve the keys.

```
sls config credentials --provider aws --key <your_aws_access_key> --secret <your_aws_secret_key>
```

Install Dependencies (FrontEnd and BackEnd)
```
cd app-backend
yarn install
cd ../app-client
yarn install
```

Test Locally - Use Apollo Lambda Server
```
# Start Server http://localhost:4000/graphql
cd app-backend
npm run start-server-lambda:offline
```

## Start Client

```
# Start Client http://localhost:3000
cd app-client
npm start
```

OR

```
# Start Client http://localhost:3000
cd app-backend
npm run start-client-local
```

## Setup for Production

Use live data from the development environment. You need to make sure you have access to your deployed lambda functions. This works only after you deployed it to production.

```
cd app-backend
npm run deploy-server-lambda-prod
```

![deploy feedback](https://cloud.githubusercontent.com/assets/223045/19171420/6e271150-8bd1-11e6-9b49-e9fa88cac379.png)

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

## Multiple package.json

In order to keep the total amount of code uploaded to AWS Lambda small the `foundation/app-server` directory containing the Serverless service has it's own `package.json`. This speeds up uploading and also should reduce the cold start time of Lambda functions. You don't have to run `npm install` manually at any point. It will only happen during deploy, but you need make sure every library you are consuming in your GraphQL endpoint is added as a dependency there.

### `app-client/package.json`

- dependencies: dependencies used by the front-end
- devDependencies: dependencies used to package the front-end application & running the local environment

### `app-backend/package.json`

- dependencies: dependencies used on AWS Lambda

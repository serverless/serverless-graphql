# Serverless GraphQL

This starter kit is an opinionated set of tools combined to help you get started building a Serverless application with an GraphQL endpoint and deploy them to production in minutes.

This example uses the following technologies:

- Serverless
- Apollo Lambda Server
- Apollo Client
- React
- Serverless Webpack
- Serverless Offline
- AWS Lambda
- AWS API Gateway
- Jest

## Install & Run

You need to have node 6 or higher installed.

```
npm install -g serverless
npm install -g yarn
yarn # installs all the node_modules
```

Test Locally - Use Apollo Express Server
```
# Start Server http://localhost:4000/graphql
cd foundation/app-server
npm start
```

Test Locally - Use Apollo Lambda Server
```
# Start Server http://localhost:4000/graphql
cd foundation/app-server
npm run start-offline
```

```
# Start Client http://localhost:3000
cd app-client
npm start
```

Use live data from the development environment. You need to make sure you have access to your deployed lambda functions. This works only after you deployed it to production.

```
cd foundation/app-server
npm run deploy
```

## Setup for Production

AWS has global unique bucket names. You need to replace `<your-s3-bucket-name>` in package.json as well as in the serverless.yml with your own custom name.

Since the URL of the API is unknown until you create a stack, you need to deploy once without expecting the application to work using `npm run deploy`.

![deploy feedback](https://cloud.githubusercontent.com/assets/223045/19171420/6e271150-8bd1-11e6-9b49-e9fa88cac379.png)

After these steps you are good to go and with your next `npm run deploy` your infrastructure should up and running. Visit `http://<your-s3-bucket-name>.s3-website-us-east-1.amazonaws.com` in your browser.

## Developing

If you make changes to the GraphQL schema stop the server, regenerate it and restart the server:

```
cd foundation/app-server
npm start
```

## Testing

We use Jest as a test runner. To run all tests use

```
npm run test
```

To update component snapshots after updating a component use

```
npm run test:update
```

## Multiple package.json

In order to keep the total amount of code uploaded to AWS Lambda small the `foundation/app-server` directory containing the Serverless service has it's own `package.json`. This speeds up uploading and also should reduce the cold start time of Lambda functions. You don't have to run `npm install` manually at any point. It will only happen during deploy, but you need make sure every library you are consuming in your GraphQL endpoint is added as a dependency there.

### `app-client/package.json`

- dependencies: dependencies used by the front-end
- devDependencies: dependencies used to package the front-end application & running the local environment

### `foundation/app-server/package.json`

- dependencies: dependencies used on AWS Lambda

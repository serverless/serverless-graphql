# Serverless GraphQL

NOTE: Please don't tweet or share this yet! The static resource setup is not yet done.

This starter kit is an opinionated set of tools combined to help you get started building a Serverless application with an GraphQL endpoint and deploy them to production in minutes.

This example uses the following technologies:

- Serverless
- GraphQL-js
- Relay
- React
- CSSModules
- Flowtype
- Jest
- Webpack
- Auth0

## Install & Run

You need to have node 6 or higher installed.

```
npm install -g serverless
npm install
```

Use mocked data (keep in mind due hard-coded data the interface might behave not as expected)
```
npm run update-schema
npm start
# visit http://localhost:3000 in your browser
```

Use live data from the development environment. You need to make sure you have access to your deployed lambda functions.

```
npm run update-schema
npm run start:remote
# visit http://localhost:3000 in your browser
```

## Setup for Production

Since we don't know the URL of the API Gateway nor CloudFront URL for the static assets we need to deploy once without expecting the application to work using `npm run deploy`. After the initial deploy we will know both Urls. The API url you need to provide in the `security.env.prod` file in order for Relay to know the location of the GraphQL endpoint. In addition you need to provide the Auth0 domain, client id and client secret.
In the Auth0 interface you need to set the following callback urls:

```
http://localhost:3000/sign-in-success,
http://<cloudforn_url>/sign-in-success
```

After these steps you are good to go and with your next `npm run deploy` your infrastructure should up and running.

## Developing

If you make changes to the GraphQL schema stop the server, regenerate it and restart the server:

```
npm run update-schema
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

## Security

At Serverless we keep our keys encrypted in the repository. We recommend you to do the same. In our case deploying to a staging and production system is done via a continuous integration system which has knows about the secret to decrypt the necessary file with the environment variables. For demo purposes this repository has an unencrypted file for environment variables at `foundation/environment/security.env.local` and `foundation/environment/security.env.prod`.

## Multiple package.json

In order to keep the total amount of code uploaded to AWS Lambda small the `api` directory containing the Serverless service has it's own `package.json`. This speeds up uploading and also should reduce the cold start time of Lambda functions. You don't have to run `npm install` manually at any point. It will only happen during deploy, but you need make sure every library you are consuming in your GraphQL endpoint is add a#s depdendency there.

### `package.json`

- depdendencies: depdendencies used by the front-end
- devDepdendencies: depdendencies used to package the front-end application & running the local environment

### `api/package.json`

- depdendencies: depdendencies used on AWS Lambda

## Authentication Flows

### New User using a Provider e.g. Github, Google

1. Visit the root site `/` [redirect to `/welcome`]
2. Click on `Try for Free` [redirect to `/sign-up` and see the signup widget]
3. Click on a a Provider Button [redirect to Github/Google]
4. Sign in at a Provider [redirect to `/sign-in-success#auth0-token`, verify & redirect to the Dashboard at `/`]

### New User using Email/Password

1. Visit the root site `/` [redirect to `/welcome`]
2. Click on `Try for Free` [redirect to `/sign-up` and see the signup widget]
3. Provide Email/Password and click Sign up button [redirect to `/sign-in-success#auth0-token`, verify & redirect to `/verify-email`]
4. Check your email account and verify the email.
5. Visit the root site `/` [redirect to `/welcome`]
6. Click on `Sign in` [redirect to `/sign-in` and see the signup widget]
7. Provide Email/Password and click Sign in button [redirect to `/sign-in-success#auth0-token`, verify & redirect to the Dashboard at `/`]

### Existing User using Email/Password, Google or Github on `/`

1. Visit the root site `/` [redirect to `/welcome`]
2. Click on `Sign in` [redirect to `/sign-in` and see the signup widget]
3. Sign in via Email/Password or a Provider e.g. Github, Google
[redirect to `/sign-in-success#auth0-token`, verify and redirect to Dashboard at `/`].

### Existing User using Email/Password, Google or Github on some internal URL e.g. `/some/path`

1. Visit the root site `/` [redirect to `/sign-in`]
2. Sign in via Email/Password or a Provider e.g Github, Google
[redirect to original url `/sign-in-success#auth0-token`, verify &  redirect to the original Url eg. `/some/path`]

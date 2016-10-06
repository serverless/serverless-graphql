# Serverless GraphQL

This Starter Kit is an opinionated set of tools combined to get started with building a Serverless application with an GraphQL endpoint.

We use the following technologies:

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

Use mocked data (keep in mind due hard-coded data the interface might behave not as expected)
```
npm install
npm run update-schema
npm start
# visit http://localhost:3000 in your browser
```

Use live data from the development environment. You need to make sure you have access to your deployed lambda functions.

```
npm install
npm run update-schema
npm run start:remote
# visit http://localhost:3000 in your browser
```

## Developing


If you make changes to `data/schema.js`, stop the server, regenerate `data/schema.json`, and restart the server:

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

At Serverless we keep our keys encrypted in the repository. We recommend you to do the same. In our case deploying to a staging and production system is done via a continuous integration system which has knows about the secret to decrypt the necessary file with the environment variables. For demo purposes this repository has an unencrypted file for environment variables at `foundation/environment/security.env.local`.

## Authentication Flows

### New User using Github or Google

1. Visit the root site `/` [redirect to `/welcome`]
2. Click on `Try for Free` [redirect to `/sign-up` and see the signup widget]
3. Click on Github/Google Button [redirect to Github/Google]
4. Sign in at the Github/Google [redirect to `/sign-in-success#auth0-token`, verify & redirect to `/infrastructure/create` (with special text for new user)]
5. Fill in the name and click the button. [redirect to `/infrastructure/<id>` and show the SDK instruction modal]

### New User using Email/Password

1. Visit the root site `/` [redirect to `/welcome`]
2. Click on `Try for Free` [redirect to `/sign-up` and see the signup widget]
3. Provide Email/Password and click Sign up button [redirect to `/sign-in-success#auth0-token`, verify & redirect to `/verify-email`]
4. Check your email account and verify the email.
5. Visit the root site `/` [redirect to `/welcome`]
6. Click on `Sign in` [redirect to `/sign-in` and see the signup widget]
7. Provide Email/Password and click Sign in button [redirect to `/sign-in-success#auth0-token`, verify & redirect to `/infrastructure/create` (with special text for new user)]
8. Fill in the name and click the button. [redirect to `/infrastructure/<id>` and show the SDK instruction modal]

### Existing User using Email/Password, Google or Github on `/`

1. Visit the root site `/` [redirect to `/welcome`]
2. Click on `Sign in` [redirect to `/sign-in` and see the signup widget]
3. Sign in via Email/Password, Github or Google
[redirect to `/sign-in-success#auth0-token`, verify &
  - redirect to Dashboard of one infrastructure exists or
  - redirect to `/infrastructure/create` if no infrastructure exists (with special text for new user)
].

### Existing User using Email/Password, Google or Github on some internal URL e.g. `/infrastructure/<some_id>`

1. Visit the root site `/` [redirect to `/sign-in`]
2. Sign in via Email/Password, Github or Google
[redirect to original url `/sign-in-success#auth0-token`, verify &  redirect to the orignal Url eg. `/infrastructure/<some_id>`]

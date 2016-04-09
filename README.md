![Serverless GraphQL Architecture Application Boilerplate](/readme_boilerplate_graphql.gif)

# Serverless GraphQL Boilerplate
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

This boilerplate application features a serverless architecture that leverages new technologies (Lambda, GraphQL) to reach a very low *total cost of ownership* (i.e., least amount of code, administration, cost).

- [Setup](#setup)
- [Team](#team)

---

## Setup

If you haven't yet installed `serverless` on your machin, run:

```
npm install -g serverless
```
then install the GraphQL Boilerplate in the CWD by running:

```
sls project install serverless-boilerplate-graphql
cd serverless-boilerplate-graphql
```

### Back
Add the `authTokenSecret` variable to `_meta/variables/s-variables-STAGE-REGION.json` and give it a strong value. This is the secret used to generate JSON web tokens. Then:

```
cd back/api
npm install
sls function deploy --all
sls endpoint deploy --all
```

### Client
Set `API_URL` in `client/src/app/js/actions/index.js`. Then:

```
cd ../../client/src
npm install
npm start
```

This will runs the client locally. You can then deploy the client to an S3 bucket with:

```
npm run build
sls client deploy
```

### Deploying to S3 bucket
Make sure you're still in the `client/src` folder mentioned above, then run:

```
npm run build
sls client deploy
```

### Testing With A Local DynamoDB Instance
- Install [Docker](https://www.docker.com/)
- Run `docker-compose up` to install and run DynamoDB.
- Add the `localDynamoDbEndpoint` variable with the value `http://<DOCKER-MACHINE-IP>:8000` to `_meta/variables/s-variables-common.json`. Example value:  `http://192.168.99.100:8000`.
- Run `sls setup db -s <stage> -r <region>` to create tables in the local DynamoDB instance.
- Run `sls offline start` to start [the offline server](https://github.com/dherault/serverless-offline).

### Testing With GraphiQL
If you're running OSX, you can use the [GraphiQL Electron App](https://github.com/skevy/graphiql-app) to test the GraphQL backend without a client:

- Install [brew cask](https://caskroom.github.io) for easy installation: `brew tap caskroom/cask`
- Install GraphiQL App: `brew cask install graphiql`
- Open GraphiQL application. Just search for `GraphiQL` using OSX Spotlight Search!
- Add your `data` endpoint to the "GraphQL Endpoint" text field, and make sure the "Method" is set to `POST`.
- Try this mutation to create the first user:


```
mutation createUserTest {
  createUser (username: "serverless", name: "Serverless Inc.", email: "hello@serverless.com", password: "secret") {
    id 
    username 
    name 
    email  
  }
}
```

- Now list all users using the following query:


```
query getUsersTest { 
  users {
    id
    username
    name
    email
  } 
}
```

- You should get the user you just created:


```
{
  "data": {
    "users": [
      {
        "id": "aca42ee0-f509-11e5-bc11-0d8b1f79b4b9",
        "username": "serverless",
        "name": "Serverless Inc.",
        "email": "hello@serverless.com"
      }
    ]
  }
}
```

### Team Workflow with Meta Sync Plugin
This boilerplate includes the [Meta Sync Plugin](https://github.com/serverless/serverless-meta-sync). To start using it you need to add the following serverless variables to `_meta/variables/s-variables-common.json`:

```js
"meta_bucket" : "SOME_BUCKET_NAME",
"meta_bucket_region" : "us-east-1" // or any other region
```
---

## Team
* [@kevinold](https://github.com/kevinold)
* [@pmuens](https://github.com/pmuens)
* [@breandr](https://github.com/breandr)
* [@erikerikson](https://github.com/erikerikson)
* [@ryansb](https://github.com/ryansb)
* [@eahefnawy](https://github.com/eahefnawy)
* [@minibikini](https://github.com/minibikini)
* [@ac360](https://github.com/ac360)

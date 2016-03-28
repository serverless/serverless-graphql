# Serverless Boilerplate
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

The goal here is not just to create the ultimate boilerplate project for building serverless applications, but to create an application boilerplate with the *lowest total cost of ownership* (e.g., the least code, administration, cost) by leveraging new tech (e.g., Lambda, GraphQL).

- [Setup](#setup)
- [Team](#team)

---

## Setup

### Serverless
1. Run `npm install` in the root of the project
2. Run `serverless project init` and follow the setup instructions to initialize the project
3. Run `serverless dash deploy` and deploy all endpoints and functions
4. Make sure to enable CORS for your API Gateway endpoints (so that external clients can access them)

### Start client
1. `cd` into the `client/src` folder
2. Run `npm install`
3. Run `npm start`
4. Open your browser and go to [http://localhost:8080](http://localhost:8080)

### Build client
1. `cd` into the `client/src` folder
2. Run `npm run-script build`
3. The built assets are now in `client/dist`

### Testing With GraphiQL
If you're running OSX, you can use the [GraphiQL Electron App](https://github.com/skevy/graphiql-app) to test the GraphQL backend without a client:

- Install [brew cask](https://caskroom.github.io) for easy installation: `brew tap caskroom/cask`
- Install GraphiQl App: `brew cask install graphiql`
- Open GraphiQL application. You'll find it in your Application folder.
- Add your data endpoint to the "GraphQL Endpoint" text field, and make sure the "Method" is set to `POST`.
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

---

## Team
* [@eahefnawy](https://github.com/eahefnawy)
* [@minibikini](https://github.com/minibikini)
* [@ac360](https://github.com/ac360)
* [@kevinold](https://github.com/kevinold)
* [@pmuens](https://github.com/pmuens)
* [@erikerikson](https://github.com/erikerikson)
* [@ryansb](https://github.com/ryansb)

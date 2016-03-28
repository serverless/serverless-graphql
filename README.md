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

---

## Team
* [@eahefnawy](https://github.com/eahefnawy)
* [@minibikini](https://github.com/minibikini)
* [@ac360](https://github.com/ac360)
* [@kevinold](https://github.com/kevinold)
* [@pmuens](https://github.com/pmuens)
* [@erikerikson](https://github.com/erikerikson)
* [@ryansb](https://github.com/ryansb)

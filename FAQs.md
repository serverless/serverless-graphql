
### How to add more data records?
In this boilerplate, we're managing all data records using GraphQL. Currently the boilerplate only has a Users record/collection. But you can easily add any other data collection (i.e.. `Posts`) in the `back/api/lib/graphql/collections` directory. Just follow the same pattern in the `Users` collection.

### How does validation work with GraphQL?
Each data collection has a `validate.js` file. This is where you should keep your validation logic, and call the validation functions on the data received from GraphQL before you resolve them. GraphQL has its own validation implementation, but it's at a very early stage at this point.

### How does authentication work with GraphQL?
In this boilerplate, we're using JSON Web Token for authentication. You can find this logic in the `back/api/lib/auth.js` file. You can simply switch another authentication mechanism by editing this file.

### Where to put the business logic of my project?

### What plugins are included with this boilerplate?
- [serverless-client-s3](): To deploy front end assets to S3
- [serverless-cors-plugin](): To enable CORS for your data endpoint and give the client access to your backend.
- [serverless-meta-sync](): To collaborate with your teammates and sync your `_meta` folder with them securely using an S3 bucket.
- [serverless-offline](): To test your project locally during development. That also includes a local dynamoDB instance.
- 
### What's the difference between installing vs cloning & initing the boilerplate?
They both achieve the same goal. However, Installing the boilerplate with `sls project install` is simpler because it also handles installing the project dependencies. We recommend using `sls project init` only if you clone the project to contribute/make a PR.

### Why do we have to `npm install` 2-3 times?
Because we're dealing with isolated micro services architecture, we have some separation of concerns around different areas of the project. So dependencies are managed at three levels:
- Project Dependencies: by running `npm install` in the root of the project. This is done for your automatically when you run `sls project install`. This mostly handles installing the plugins.
- Backend Dependencies: by running `npm install` in the root of the `data/api` directory. This makes all the `node_modules` required by the boilerplate available for deployment with your functions.
- Frontend Dependencies:by running `nam install` in the root of the `client/src` directory. This installs all the client side dependencies to make your React application work.
### Why can't we deploy with `sls dash deploy`?
You can deploy with `sls dash deploy`, however the Serverless CORS Plugin requires that you deploy your endpoints with `sls endpoint deploy` so that it could fire the necessary pre hooks that will enable CORS.
### How to connect the client to the Serverless backend?
By setting the `API_URL` variable in `client/src/app/js/actions/index.js` Please keep in mind that this is the **root of your API** not the endpoint url you get from `sls endpoint deploy`
// Load the SDK for JavaScript
const AWS = require('aws-sdk');
const fs = require('fs');

// Set the region
AWS.config.update({ region: 'us-east-1' });
AWS.config.setPromisesDependency(require('bluebird'));

const appsync = new AWS.AppSync({ apiVersion: '2017-07-25' });

// For creating User Pool: Reference https://serverless-stack.com/chapters/create-a-cognito-user-pool.html
// API key is not recommended for security.

const graphQLAPIName = '...'; // your graphQL API Name
const awsRegion = 'us-east-1'; // AWS Region ex - us-east-1
const userPoolId = '...'; // Your Cognito User Pool Id
const roleName = 'Dynamo-AppSyncServiceRole';
const accountId = '...';
const serviceRole = `arn:aws:iam::${accountId}:role/${roleName}`; // Service IAM Role for appsync to access data sources
const MAX_RETRIES = 20;
let appId;

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

const createGraphQLAPIParams = {
  authenticationType: 'AMAZON_COGNITO_USER_POOLS' /* required */,
  name: graphQLAPIName /* required */,
  userPoolConfig: {
    awsRegion: awsRegion /* required */,
    defaultAction: 'ALLOW' /* required */,
    userPoolId: userPoolId /* required */,
  },
};

/* STEP 1 : Create GRAPHQL EndPoint */
appsync
  .createGraphqlApi(createGraphQLAPIParams)
  .promise()
  .then(async data => {
    console.log(data); // successful response
    console.log(`GraphQL API ID : ${data.graphqlApi.apiId}`);
    console.log(`GraphQL EndPoint : ${data.graphqlApi.uris.GRAPHQL}`);

    appId = data.graphqlApi.apiId;

    const datasourceParams = [
      {
        apiId: appId /* required */,
        name: 'users' /* required */,
        type: 'AMAZON_DYNAMODB' /* required */,
        description: 'Store user info',
        dynamodbConfig: {
          awsRegion: awsRegion /* required */,
          tableName: 'users' /* required */,
        },
        serviceRoleArn: serviceRole,
      },
    ];

    const dataSourceList = [];

    for (let i = 0; i < datasourceParams.length; i++) {
      dataSourceList.push(
        appsync.createDataSource(datasourceParams[i]).promise()
      );
    }

    /* STEP 2 : Attach DataSources to GRAPHQL EndPoint */
    await Promise.all(dataSourceList).then(result => {
      console.log('all the datasources are created');
      console.log(result);
    });
  })
  .then(() => {
    const file = fs.readFileSync('schema.graphql', 'utf8');

    const schemaCreationparams = {
      apiId: appId /* required */,
      definition: new Buffer(file),
    };

    /* STEP 3 : Create GraphQL Schema */
    return appsync.startSchemaCreation(schemaCreationparams).promise();
  })
  .then(async data => {
    console.log(data);

    const schemaCreationparams = {
      apiId: appId /* required */,
    };

    for (let i = 0; i <= MAX_RETRIES; i++) {
      try {
        let success = false;

        await appsync
          .getSchemaCreationStatus(schemaCreationparams)
          .promise()
          .then(result => {
            console.log(result);
            if (result.status === 'SUCCESS') {
              success = true;
            }
          });

        if (success) break;
      } catch (err) {
        const timeout = Math.pow(2, i) * 1000;
        console.log('Waiting', timeout, 'ms');
        await wait(timeout);
        console.log('Retrying', err.message, i);
      }
    }
  })
  .then(() => {
    const getSchemaParams = {
      apiId: appId /* required */,
      format: 'SDL' /* required */,
    };

    /* STEP 4 : GET Schema for GraphQL Endpoint */
    return appsync.getIntrospectionSchema(getSchemaParams).promise();
  })
  .then(data => {
    console.log(data); // successful response

    const schema = new Buffer(data.schema, 'base64');
    console.log(schema.toString());
  })
  .then(async () => {
    const resolverParams = [
      {
        apiId: appId /* required */,
        dataSourceName: 'users' /* required */,
        fieldName: 'getUserTwitterFeed' /* required */,
        requestMappingTemplate: fs.readFileSync(
          'mapping-templates/getUserTwitterFeed-request-mapping-template.txt',
          'utf8'
        ) /* required */,
        typeName: 'Query' /* required */,
        responseMappingTemplate: fs.readFileSync(
          'mapping-templates/getUserTwitterFeed-response-mapping-template.txt',
          'utf8'
        ) /* required */,
      },
      {
        apiId: appId /* required */,
        dataSourceName: 'users' /* required */,
        fieldName: 'topTweet' /* required */,
        requestMappingTemplate: fs.readFileSync(
          'mapping-templates/topTweet-request-mapping-template.txt',
          'utf8'
        ) /* required */,
        typeName: 'User' /* required */,
        responseMappingTemplate: fs.readFileSync(
          'mapping-templates/topTweet-response-mapping-template.txt',
          'utf8'
        ) /* required */,
      },
      {
        apiId: appId /* required */,
        dataSourceName: 'users' /* required */,
        fieldName: 'tweets' /* required */,
        requestMappingTemplate: fs.readFileSync(
          'mapping-templates/tweets-request-mapping-template.txt',
          'utf8'
        ) /* required */,
        typeName: 'User' /* required */,
        responseMappingTemplate: fs.readFileSync(
          'mapping-templates/tweets-response-mapping-template.txt',
          'utf8'
        ) /* required */,
      },
      {
        apiId: appId /* required */,
        dataSourceName: 'users' /* required */,
        fieldName: 'createTweet' /* required */,
        requestMappingTemplate: fs.readFileSync(
          'mapping-templates/createTweet-request-mapping-template.txt',
          'utf8'
        ) /* required */,
        typeName: 'Mutation' /* required */,
        responseMappingTemplate: fs.readFileSync(
          'mapping-templates/createTweet-response-mapping-template.txt',
          'utf8'
        ) /* required */,
      },
      {
        apiId: appId /* required */,
        dataSourceName: 'users' /* required */,
        fieldName: 'deleteTweet' /* required */,
        requestMappingTemplate: fs.readFileSync(
          'mapping-templates/deleteTweet-request-mapping-template.txt',
          'utf8'
        ) /* required */,
        typeName: 'Mutation' /* required */,
        responseMappingTemplate: fs.readFileSync(
          'mapping-templates/deleteTweet-response-mapping-template.txt',
          'utf8'
        ) /* required */,
      },
      {
        apiId: appId /* required */,
        dataSourceName: 'users' /* required */,
        fieldName: 'reTweet' /* required */,
        requestMappingTemplate: fs.readFileSync(
          'mapping-templates/reTweet-request-mapping-template.txt',
          'utf8'
        ) /* required */,
        typeName: 'Mutation' /* required */,
        responseMappingTemplate: fs.readFileSync(
          'mapping-templates/reTweet-response-mapping-template.txt',
          'utf8'
        ) /* required */,
      },
      {
        apiId: appId /* required */,
        dataSourceName: 'users' /* required */,
        fieldName: 'updateTweet' /* required */,
        requestMappingTemplate: fs.readFileSync(
          'mapping-templates/updateTweet-request-mapping-template.txt',
          'utf8'
        ) /* required */,
        typeName: 'Mutation' /* required */,
        responseMappingTemplate: fs.readFileSync(
          'mapping-templates/updateTweet-response-mapping-template.txt',
          'utf8'
        ) /* required */,
      },
      {
        apiId: appId /* required */,
        dataSourceName: 'users' /* required */,
        fieldName: 'createUserInfo' /* required */,
        requestMappingTemplate: fs.readFileSync(
          'mapping-templates/createUserInfo-request-mapping-template.txt',
          'utf8'
        ) /* required */,
        typeName: 'Mutation' /* required */,
        responseMappingTemplate: fs.readFileSync(
          'mapping-templates/createUserInfo-response-mapping-template.txt',
          'utf8'
        ) /* required */,
      },
    ];

    const resolverList = [];

    for (let i = 0; i < resolverParams.length; i++) {
      resolverList.push(appsync.createResolver(resolverParams[i]).promise());
    }

    /* STEP 5 : Create Resolvers */
    await Promise.all(resolverList).then(data => {
      console.log('all the resolvers are created');
      console.log(data);
    });
  })
  .then(() => {
    const listParams = {
      apiId: appId /* required */,
      format: 'SDL' /* required */,
    };

    return appsync.listTypes(listParams).promise();
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));

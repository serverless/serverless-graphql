import Promise from 'bluebird';
import {DynamoDB} from 'aws-sdk';

const dynamoConfig = {
  sessionToken:    process.env.AWS_SESSION_TOKEN,
  region:          process.env.SERVERLESS_REGION
};

if (process.env.IS_OFFLINE) dynamoConfig.endpoint = process.env.LOCAL_DDB_ENDPOINT;

const client = new DynamoDB.DocumentClient(dynamoConfig);

export default (method, params) => {
  return Promise.fromCallback(cb => client[method](params, cb));
}

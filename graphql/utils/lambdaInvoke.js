/* @flow */

import aws from 'aws-sdk';
import isLambdaEnvironment from './isLambdaEnvironment';

const LAMBDA_CONFIG = isLambdaEnvironment() ?
  { apiVersion: '2015-03-31' } :
  { apiVersion: '2015-03-31', region: 'us-west-2' };

const lambda = new aws.Lambda(LAMBDA_CONFIG);

export default (functionName: string, payload: Object): Promise<any> => {
  const params = {
    FunctionName: functionName,
    Payload: JSON.stringify(payload),
  };

  return lambda.invoke(params)
    .promise()
    .then(response => JSON.parse(response.Payload));
};

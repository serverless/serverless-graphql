'use strict';

const chai = require('chai');
const commonVariables = require('../_meta/variables/s-variables-common.json');
const _ = require('lodash');

process.env.LOCAL_DDB_ENDPOINT = commonVariables.localDynamoDbEndpoint;
process.env.SERVERLESS_PROJECT = commonVariables.project;
process.env.AUTH_TOKEN_SECRET = 'secret-token-1';
process.env.IS_OFFLINE = true;

chai.config.includeStack = true;

global.expect = chai.expect;

global.combineErrors = (errors, error) => {
  return !_.isEmpty(errors) ? new Error(_.map(errors, (error) => {
    return error.message
  })) : error;
};

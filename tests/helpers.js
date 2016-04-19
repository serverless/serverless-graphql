'use strict';

const chai = require('chai');
const commonVariables = require('../_meta/variables/s-variables-common.json');
const _ = require('lodash');

process.env.LOCAL_DDB_ENDPOINT = commonVariables.localDynamoDbEndpoint;
process.env.SERVERLESS_PROJECT = commonVariables.project;
process.env.AUTH_TOKEN_SECRET = 'secret-token-1';
process.env.IS_OFFLINE = true;

chai.config.includeStack = false;
chai.config.showDiff = false;

global.expect = chai.expect;

/**
 * combines response errors and error
 * @param errors
 * @param error
 * @returns Error
 */
global.combineErrors = (errors, error) => {
  let err = !_.isEmpty(errors) ? _.map(errors, (error) => {
    if(error.originalError instanceof Error){
      return error.originalError
    } else {
      return new Error(error.originalError);
    }
  }) : error;

  if(_.isArray(err)){
    if(err.length == 1){
      // take first error from response errors
      return _.first(err);
    } else {
      // multiple errors from response
      return new Error(err.join());
    }
  } else {
      return err;
  }
};


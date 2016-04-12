'use strict';

/**
 * Creates Tables in the local DynamoDB
 */

const path  = require('path'),
  fs        = require('fs'),
  _        = require('lodash'),
  BbPromise = require('bluebird');

module.exports = function(S) {
  const SError = require(S.getServerlessPath('Error'));
  const SCli = require(S.getServerlessPath('utils/cli'));
  const DynamoDB = require('aws-sdk').DynamoDB;

  return class SetupDb extends S.classes.Plugin {

    constructor() {
      super();
      this.name = 'setupDb';
    }

    registerActions() {

      S.addAction(this.setupDb.bind(this), {
        handler:       'setupDb',
        description:   'This command setups the local DynamoDB instance',
        context:       'setup',
        contextAction: 'db',
        options:       [
          {
            option:      'stage',
            shortcut:    's',
          }, {
            option:      'region',
            shortcut:    'r',
          }
        ],
        parameters: []
      });

      return BbPromise.resolve();
    }


    setupDb(evt) {
      const stage = evt.options.stage;
      const region = evt.options.region;

      if (!stage || !region) return BbPromise.reject(new SError("stage and region are required parameters"));

      return S.getProvider('aws').getCredentials(stage, region)
        .then((credentials) => {
          evt.data.credentials = credentials;
          return this._setupDb(evt);
        });
    }


    _setupDb(evt) {
      const stage = evt.options.stage;
      const region = evt.options.region;
      const credentials = evt.data.credentials;

      const endpoint = S.getProject().getVariablesObject(stage, region).localDynamoDbEndpoint;
      const dynamoConfig = _.merge({endpoint}, credentials);

      const client = new DynamoDB(dynamoConfig);

      const db = (method, params) => {
        return BbPromise.fromCallback(cb => client[method](params, cb));
      }

      const resources = S.getProject()
        .getResources()
        .toObjectPopulated({stage, region})
        .Resources;

      const tables =_.chain(resources)
        .filter({Type: 'AWS::DynamoDB::Table'})
        .map('Properties')
        .value();

      return db('listTables', {})
        .then(reply => reply.TableNames)
        .then(existingTables => {
          return BbPromise.each(tables, tableConfig => {
            const name = tableConfig.TableName;

            if (existingTables.indexOf(name) > -1) {
              return SCli.log(`Table "${name}" exists already`);
            }

            return db('createTable', tableConfig)
              .then(reply => SCli.log(`Table "${name}" has been created`))
          })
        })
        .then(() => {
          SCli.log('Done');
          return evt;
        })
    }


  }
};
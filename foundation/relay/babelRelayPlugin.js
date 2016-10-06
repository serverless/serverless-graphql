/* @flow */

var getbabelRelayPlugin = require('babel-relay-plugin'); // eslint-disable-line no-var
var schema = require('../../graphql/schema.json'); // eslint-disable-line no-var

module.exports = getbabelRelayPlugin(schema.data);

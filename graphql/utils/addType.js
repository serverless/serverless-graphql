/* @flow */

export default (dbFunction, typename) => (
  (...args) => dbFunction(...args).then((result) => ({ ...result, _type: typename }))
);

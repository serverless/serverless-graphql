/* @flow */

export default (dbFunction: Function, typename: string) => (
  (...args: any) => dbFunction(...args).then((result) => ({ ...result, _type: typename }))
);

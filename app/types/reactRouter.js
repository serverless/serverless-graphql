/* @flow */

export type Location = {
  // Note: in case of onEnter location has query, but not when passed down from a Route
  pathname: string,
  query?: Object,
  search: string,
  origin: string,
};

export type Router = {
  push: Function,
}

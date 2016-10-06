/* @flow */
/* eslint-disable import/prefer-default-export */

export type Edge<T> = {
  node: T
}

export type Connection<T> = {
  edges: Edge<T>[]
}

export default (dbFunction, typename) => (
  (...args) => dbFunction(...args).then((result) => result.map((entry) => ({ ...entry, _type: typename })))
);

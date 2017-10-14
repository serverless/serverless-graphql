import { graphqlHandler, graphiqlHandler } from './handler';

it('graphqlHandler should be a function', () => {
  expect(typeof graphqlHandler).toBe('function');
});

it('graphiqlHandler should be a function', () => {
  expect(typeof graphiqlHandler).toBe('function');
});

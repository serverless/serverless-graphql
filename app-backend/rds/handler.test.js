import { graphqlHandler, playgroundHandler } from './handler';

it('graphqlHandler should be a function', () => {
  expect(typeof graphqlHandler).toBe('function');
});

it('playgroundHandler should be a function', () => {
  expect(typeof playgroundHandler).toBe('function');
});

it('graphiqlHandler should be a function', () => {
  expect(typeof graphiqlHandler).toBe('function');
});

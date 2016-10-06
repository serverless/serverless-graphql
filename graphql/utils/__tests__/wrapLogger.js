import wrapLogger from '../wrapLogger';

describe('wrapLogger', () => {
  it('returns the same structure as the original db', () => {
    const db = {
      fn1: () => 'result1',
      fn2: () => 'result2',
    };
    const result = wrapLogger(db);

    expect(Object.keys(result)).toEqual(Object.keys(db));
    expect(result.fn1()).toEqual('result1');
  });

  it('passed the arguments to the original function', () => {
    const db = {
      fn1: (arg1) => `${arg1}`,
    };
    const result = wrapLogger(db);

    expect(result.fn1('arg1')).toEqual('arg1');
  });
});

import { createState } from '../src/main';

describe('createState function', () => {
  // Read more about fake timers
  // http://facebook.github.io/jest/docs/en/timer-mocks.html#content
  jest.useFakeTimers();

  it('create a state', () => {
    const [getCounter, setCounter] = createState(0);

    expect(getCounter()).toBe(0)

    setCounter(5);
    expect(getCounter()).toBe(5)

    setCounter(n => n + 1)
    expect(getCounter()).toBe(6)
  });
});

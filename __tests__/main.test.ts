import { createState } from '../src/main';

describe('createState function', () => {
  // Read more about fake timers
  // http://facebook.github.io/jest/docs/en/timer-mocks.html#content
  jest.useFakeTimers();

  it('create a state and modify', () => {
    const [getCounter, setCounter] = createState(0);

    expect(getCounter()).toBe(0)

    setCounter(5);
    expect(getCounter()).toBe(5)

    setCounter(n => n + 1)
    expect(getCounter()).toBe(6)
  });

  it('subscribe changes', () => {
    let attempt = 0;
    const results = [0, 100, 20];

    const [getCounter, setCounter, { subscribe }] = createState(0);

    subscribe((num) => {
      expect(num).toBe(results[attempt]);
      attempt++;
      // done();
    });

    setCounter(100);
    expect(getCounter()).toBe(100);

    setCounter(20);
    expect(getCounter()).toBe(20);
  });

  it('create another state', () => {
    const [getStuff, setStuff] = createState('table');

    expect(getStuff()).toBe('table')

    setStuff('chair');
    expect(getStuff()).toBe('chair')

    setStuff(n => n + ' 2')
    expect(getStuff()).toBe('chair 2')
  });
});

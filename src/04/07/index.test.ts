import { greetByTime } from '.';

describe('greetByTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Good Morning', () => {
    jest.setSystemTime(new Date(2024, 4, 23, 8, 0, 0));
    expect(greetByTime()).toBe('Good Morning!');
  });
  test('Good Afternoon!', () => {
    jest.setSystemTime(new Date(2024, 4, 23, 14, 0, 0));
    expect(greetByTime()).toBe('Good Afternoon!');
  });
  test('Good Evening', () => {
    jest.setSystemTime(new Date(2024, 4, 23, 21, 0, 0));
    expect(greetByTime()).toBe('Good Evening!');
  });
});

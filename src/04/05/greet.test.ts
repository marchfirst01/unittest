import { greet } from './greet';

describe('mockFn', () => {
  test('mock 함수 실행됨', () => {
    const mockFn = jest.fn();
    mockFn();
    expect(mockFn).toBeCalled();
  });
  test('mock 함수 실행되지 않음', () => {
    const mockFn = jest.fn();
    expect(mockFn).not.toBeCalled();
  });
  test('mock 함수는 실행 횟수를 기록한다', () => {
    const mockFn = jest.fn();
    mockFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
    mockFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  test('mock 함수는 함수 안에서도 실행할 수 있다', () => {
    const mockFn = jest.fn();
    function greet() {
      mockFn();
    }
    greet();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  test('mock 함수는 실행 시 인수를 기록한다', () => {
    const mockFn = jest.fn((name: string) => name);
    expect(mockFn('seeun')).toBe('seeun');
    expect(mockFn).toHaveBeenCalledWith('seeun');
  });
});

describe('spyOn', () => {
  test('mock 함수를 테스트 대상의 인수로 사용할 수 있다', () => {
    const mockFn = jest.fn();
    greet('seeun', mockFn);
    expect(mockFn).toHaveBeenCalledWith('Hello! seeun');
  });
});

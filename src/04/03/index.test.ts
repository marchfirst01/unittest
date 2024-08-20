import { getGreet } from '.';
import * as Fetchers from '../fetchers';
import { httpError } from '../fetchers/fixtures';

// mock을 이용해서 fetchers에 있는 함수들을 대체
jest.mock('../fetchers');

describe('getGreet', () => {
  test('데이터 취득 성공 시: 사용자 이름이 없는 경우', async () => {
    // spyOn을 이용해서 fetchers에 있는 getMyProfile의 내용 정의
    // getMyProfile이 resolves 됐을 때의 값 재현
    jest.spyOn(Fetchers, 'getMyProfile').mockResolvedValueOnce({
      id: '123456-123456',
      email: 'seeun@testing.com',
    });
    await expect(getGreet()).resolves.toBe('Hello, anonymous user!');
  });
  test('데이터 취득 성공 시: 사용자 이름이 있는 경우', async () => {
    jest.spyOn(Fetchers, 'getMyProfile').mockResolvedValueOnce({
      id: '123456-123456',
      name: 'seeun',
      age: 24,
      email: 'seeun@testing.com',
    });
    await expect(getGreet()).resolves.toBe('Hello, seeun!');
  });
  test('데이터 취득 실패 시', async () => {
    jest.spyOn(Fetchers, 'getMyProfile').mockRejectedValueOnce(httpError);
    // getGreet()을 실행했을 때 결과가 rejects 되고, 아래의 내용에 일치할 것(toMatchObject)이다.
    await expect(getGreet()).rejects.toMatchObject({
      // 오류 발생 시 throw 되는 data
      err: { message: 'internal server error' },
    });
  });
  test('데이터 취득 실패 시 오류가 발생한 데이터와 함께 예외가 throw 된다.', async () => {
    // 1번은 실행될 것이다
    expect.assertions(1);
    jest.spyOn(Fetchers, 'getMyProfile').mockRejectedValueOnce(httpError);
    try {
      await getGreet();
    } catch (error) {
      // 에러가 발생하면 그 에러는 httpError와 일치할 것
      expect(error).toMatchObject(httpError);
    }
  });
});

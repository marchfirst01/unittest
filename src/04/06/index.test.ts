import { checkLength } from '.';
import * as Fetchers from '../fetchers';
import { postMyArticle } from '../fetchers';
import { httpError, postMyArticleData } from '../fetchers/fixtures';
import { ArticleInput } from '../fetchers/type';

jest.mock('../fetchers');

// status 확인, input의 title, body가 유효성을 통과하는지 확인
function mockPostMyArticle(input: ArticleInput, status = 200) {
  if (status > 299) {
    return jest
      .spyOn(Fetchers, 'postMyArticle')
      .mockRejectedValueOnce(httpError);
  }
  try {
    checkLength(input.title);
    checkLength(input.body);
    return (
      jest
        .spyOn(Fetchers, 'postMyArticle')
        // 전부 통과하면 미리 정의된 반환값을 저장
        .mockResolvedValue({ ...postMyArticleData, ...input })
    );
  } catch (err) {
    return jest
      .spyOn(Fetchers, 'postMyArticle')
      .mockRejectedValueOnce(httpError);
  }
}

// 입력을 보낼 값을 동적으로 생성할 수 있는 팩토리 함수
function inputFactory(input?: Partial<ArticleInput>) {
  return {
    tags: ['testing'],
    title: '타입스크립트를 사용한 테스트 작성법',
    body: '테스트 작성 시 타입스크립트를 사용하면 테스트의 유지보수가 쉬워진다',
    ...input,
  };
}

describe('postMyArticle', () => {
  test('유효성 검사에 성공하면 성공 응답을 반환한다', async () => {
    // 유효성 검사에 통과하는 입력값을 input에 저장
    const input = inputFactory();
    // 입력값을 포함한 성공 응답을 반환하는 mock 객체
    // 실행하면서 postMyArticle의 값을 정의해줌
    const mock = mockPostMyArticle(input);
    // input을 인수로 테스트할 함수(postMyArticle)를 실행
    const data = await postMyArticle(input);
    // 취득한 데이터에 입력 내용이 포함됐는지 검증
    expect(data).toMatchObject(expect.objectContaining(input));
    // mock 함수가 호출됐는지 검증
    expect(mock).toHaveBeenCalled();
  });
  test('유효성 검사에 실패하면 reject된다', async () => {
    // 유효성 검사에 통과하지 못하는 입력값을 input에 저장
    const input = inputFactory({ title: '', body: '' });
    // mockPostMyArticle을 실행하면 유효성 검사에서 걸릴 것
    // httpError가 저장될 것
    const mock = mockPostMyArticle(input);
    // 유효성 검사에 통과하지 못하고 reject 됐는지 검증
    await postMyArticle(input).catch(err => {
      expect(err).toMatchObject({
        err: { message: 'internal server error' },
      });
    });
    expect(mock).toHaveBeenCalled();
  });
  test('데이터 취득에 실패하면 reject된다', async () => {
    const input = inputFactory();
    // 입력값은 유효성 검사를 통과하지만, 상태 문제로 데이터 취득에 실패하는 상황
    const mock = mockPostMyArticle(input, 500);
    await postMyArticle(input).catch(err => {
      expect(err).toMatchObject({
        err: { message: 'internal server error' },
      });
      expect(mock).toHaveBeenCalled();
    });
  });
});

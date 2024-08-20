import { getMyArticleLinksByCategory } from '.';
import * as Fetchers from '../fetchers';
import { getMyArticlesData, httpError } from '../fetchers/fixtures';

// jest.mock을 이용해서 ../fetchers에 있는 함수들을 이름만 적힌 빈 깡통으로 만들기
// jest.spyOn을 이용해서 함수 실행했을 때 결과만 설정하기
// 왜 빈 깡통으로 만드냐면 fetchers에 있는 함수와의 의존성을 줄이기 위해서 <- 맞나?
// 요런 느낌인가?
jest.mock('../fetchers');

// mock 객체 생성 함수
// 테스트에 필요한 설정을 최대한 적은 매개변수로 교체할 수 있게 만드는 유틸리티 함수
// 이 함수 만드는 이유가 머지? 좀 더 복잡한 상황에서 적용하는 예시가 있으면 좋겠다.
function mockGetMyArticles(status = 200) {
  if (status > 299) {
    // status가 300이상이면 에러발생
    return jest
      .spyOn(Fetchers, 'getMyArticle')
      .mockRejectedValueOnce(httpError);
  }
  // status가 200대 숫자면 문제가 없으므로, getMyArticlesData의 데이터를 spyOn을 이용해 지정
  return jest
    .spyOn(Fetchers, 'getMyArticle')
    .mockResolvedValueOnce(getMyArticlesData);
}

describe('getMyArticles', () => {
  test('데이터 취득 성공', () => {
    mockGetMyArticles();
  });
  test('데이터 취득 실패', async () => {
    mockGetMyArticles(500);
  });
  test('지정한 태그를 포함한 기사가 한 건도 없으면 null을 반환', async () => {
    // status 200 통과, mock 데이터를 getMyArticlesData로 지정
    mockGetMyArticles();
    // getMyArticleLinksByCategory('jest') 실행
    const data = await getMyArticleLinksByCategory('jest');
    expect(data).toBeNull();
  });
  test('지정한 태그를 포함한 기사가 한 건 이상 있으면 링크 목록 반환', async () => {
    mockGetMyArticles();
    const data = await getMyArticleLinksByCategory('testing');
    expect(data).toMatchObject([
      {
        link: '/articles/howto-testing-with-typescript',
        title: '타입스크립트를 사용한 테스트 작성법',
      },
      {
        link: '/articles/react-component-testing-with-jest',
        title: '제스트로 시작하는 리액트 컴포넌트 테스트',
      },
    ]);
  });
  test('데이터 취득에 실패하면 reject 된다', async () => {
    mockGetMyArticles(500);
    // 둘 다 같은 내용
    // try {
    //   await getMyArticleLinksByCategory('jest');
    // } catch (err) {
    //   expect(err).toMatchObject({
    //     err: { message: 'internal server error' },
    //   });
    // }
    await getMyArticleLinksByCategory('jest').catch(err => {
      expect(err).toMatchObject({
        err: { message: 'internal server error' },
      });
    });
  });
});

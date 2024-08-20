import { checkConfig } from './checkConfig';

// 뭔소리지 진짜 모르겠다
// 실무에서는 '폼에 특정 인터랙션이 발생하면 응답으로 받은 값은 00이다'같은 테스트로 활용
test('mock 함수는 실행 시 인수가 객체일 때에도 검증할 수 있다', () => {
  const mockFn = jest.fn();
  // checkConfig 안에 mockFn을 넣어서 실행, callback === mockFn
  // checkConfig 내부에서 mockFn(config)가 호출됨
  checkConfig(mockFn);
  // mockFn이 { mock: ~ } 라는 객체를 인수로 하여 호출되었는지 확인
  // mockFn이 config 객체를 잘 전달받았는지를 확인하는 테스트인 것
  expect(mockFn).toHaveBeenCalledWith({
    mock: true,
    feature: { spy: true },
  });
});

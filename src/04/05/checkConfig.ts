const config = {
  mock: true,
  feature: { spy: true },
};

export function checkConfig(callback?: (payload: object) => void) {
  // callback 함수가 전달되면 config 객체를 인수로 전달하여 callback 함수 실행
  callback?.(config);
}

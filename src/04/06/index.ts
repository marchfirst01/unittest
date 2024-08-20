// 일반적으로 백엔드에서 전달받은 데이터를 저장하기 전에 유효성 검사를 실시함
// 다음은 백엔드에서 실시하는 유효성 검사를 재현한 함수이다

export class ValidationError extends Error {}

export function checkLength(value: string) {
  if (value.length === 0) {
    throw new ValidationError('한 글자 이상의 문자를 입력해주세요');
  }
}

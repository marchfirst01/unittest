import { HttpError } from './type';

// 오류 발생 시 throw 되는 data
export const httpError: HttpError = {
  err: { message: 'internal server error' },
};

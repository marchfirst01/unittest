export type HttpError = {
  err: { message: string };
};

export type Profile = {
  id: string;
  name?: string;
  age?: number;
  email: string;
};

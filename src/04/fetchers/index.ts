import { Profile } from './type';

async function handleResponse(res: Response) {
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data;
}

const host = (path: string) => `https://myapi.testing.com${path}`;

export async function getMyProfile(): Promise<Profile> {
  return fetch(host('/my/profile')).then(handleResponse);
}

export async function getMyArticle() {
  return fetch(host('/my/articles')).then(handleResponse);
}

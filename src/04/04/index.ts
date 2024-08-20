import { getMyArticle } from '../fetchers';
import { Article } from '../fetchers/type';

export async function getMyArticleLinksByCategory(category: string) {
  // getMyArticle data 가져오기
  const data = await getMyArticle();
  // 취득한 데이터 중 지정한 태그를 포함한 기사만 골라내기
  const articles = data.articles.filter((article: Article) =>
    article.tags.includes(category)
  );
  if (!articles.length) {
    return null;
  }
  return articles.map((article: Article) => ({
    title: article.title,
    link: `/articles/${article.id}`,
  }));
}

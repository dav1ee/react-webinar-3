import { api } from './';

const endpoint = '/articles';

export async function getArticles(limit, skip) {
  return await api.get(
    `${endpoint}?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
  );
}

export async function getArticleById(id) {
  return await api.get(`${endpoint}/${id}?fields=*,madeIn(title,code),category(title)`);
}

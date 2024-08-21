'use server';

import axios from 'axios';

const apiRest = axios.create({
  baseURL: process.env.API_URL_REST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export const apiGraphql = axios.create({
  baseURL: process.env.API_URL_GRAPHQL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export async function getPosts() {
  const response = await apiRest
    .get('/blogs?populate=deep')
    .then((res) => res?.data?.data || []);
  return response;
}

export async function getPostsPromoted() {
  const response = await apiRest
    .get(
      '/blogs?filters[promoted]=true&pagination[page]=1&pagination[pageSize]=5&sort=publishedAt:asc&populate=deep'
    )
    .then((res) => res?.data?.data || []);
  return response;
}

export async function getPostBySlug(slug = '') {
  const response = await apiRest
    .get(`/blogs?filters[slug]=${slug}&populate=deep`)
    .then((res) => res?.data?.data?.[0] || {})
    .then((res) => {
      return {
        id: res?.id,
        ...(res?.attributes ?? {}),
      };
    });
  return response;
}

export async function getAssetBySlug(slug = '') {
  const response = await apiRest
    .get(`/assets?filters[slug]=${slug}&populate=*`)
    .then((res) => res?.data?.data?.[0] || {})
    .then((res) => {
      return {
        id: res?.id,
        ...(res?.attributes ?? {}),
      };
    });
  return response;
}

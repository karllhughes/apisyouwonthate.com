// Install gray-matter and date-fns
import { join } from 'path';

import {
  getAllContentFromDirectory,
  getContentBySlug,
} from './contentTypeLoader';

const postsDirectory = join(process.cwd(), 'src', 'content', 'blog');
const POST_CONTENT_TYPE = 'post';

export const getPostBySlug = async (slug) => {
  const post = await getContentBySlug(slug, postsDirectory, POST_CONTENT_TYPE);

  return post;
};

export const getAllPosts = async () => {
  const allPosts = await getAllContentFromDirectory(
    postsDirectory,
    POST_CONTENT_TYPE,
    false
  );

  return allPosts;
};

export const getAllPostsByTag = async (tag) => {
  const posts = await getAllPosts();

  return posts.filter((post) => post?.frontmatter?.tags?.includes(tag)) || [];
};

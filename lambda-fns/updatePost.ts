import Post from './Post';
import db from './db';

async function updatePost(post: Post) {
  if (Object.entries(post).length === 1) return;
  let query =  `UPDATE posts SET`;
  const updateVariables: { [key: string]: string } = { id: post.id };
  Object.entries(post).forEach(item => {
      if (item[0] === 'id') return;
      updateVariables[item[0]] = item[1];
      if (Object.keys(updateVariables).length > 2) {
        query = `${query},`;
      }
      query = `${query} ${item[0]} = :${item[0]} `;
  })
  query = query + 'where id = :id';
  try {
      await db.query(query, updateVariables)
      return post
    } catch (err) {
        console.log('Postgres error: ', err);
        return null;
    }
}

export default updatePost;
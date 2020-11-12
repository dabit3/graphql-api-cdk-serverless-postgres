import Post from './Post';
import db from './db';
const { v4: uuid } = require('uuid');

async function createPost(post: Post) {
    if (!post.id) post.id = uuid();
    const { id, title, content } = post;
    try {
        const query = `INSERT INTO posts (id,title,content) VALUES(:id,:title,:content)`;
        await db.query(query, { id, title, content });
        return post;
    } catch (err) {
        console.log('Postgres error: ', err);
        return null;
    }
}

export default createPost;
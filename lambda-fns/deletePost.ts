import db from './db';

async function deletePost(postId: string) {
    try {
        const query = `DELETE FROM posts WHERE id = :postId`;
        await db.query(query, { postId });
        return postId
    } catch (err) {
        console.log('Postgres error: ', err);
        return null;
    }
}

export default deletePost;
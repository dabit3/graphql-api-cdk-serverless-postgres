import db from './db';

async function deletePost(postId: string) {
    try {
        const query = `DELETE FROM posts WHERE id = :postId`;
        const result = await db.query(query, { postId });
        console.log("result from delete!: ", result)
        return postId;
    } catch (err) {
        console.log('Postgres error: ', err);
        return null;
    }
}

export default deletePost;
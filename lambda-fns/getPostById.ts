import db from './db';

async function getPostById(postId: string) {
    try {
        const query  = `SELECT * FROM posts WHERE id = :postId`;
        const results = await db.query(query, { postId });
        return results.records[0];
    } catch (err) {
        console.log('Postgres error: ', err);
        return null;
    }
}

export default getPostById;
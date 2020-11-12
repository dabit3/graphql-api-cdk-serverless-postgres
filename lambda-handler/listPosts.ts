import db from './db';

async function listPosts() {
    try {
        const result = await db.query(`SELECT * FROM posts`)
        return result.records;
    } catch (err) {
        console.log('Postgres error: ', err);
        return null
    }
}

export default listPosts;
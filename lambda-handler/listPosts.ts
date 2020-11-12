const db = require('data-api-client')({
    secretArn: process.env.SECRET_ARN,
    resourceArn: process.env.CLUSTER_ARN,
    database: 'BlogDB'
})

async function listPosts() {
    try {
        const result = await db.query(`SELECT * FROM posts`)
        console.log("result::::::", result)
        return result.records;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null
    }
}

export default listPosts;
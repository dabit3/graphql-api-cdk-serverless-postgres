const db = require('data-api-client')({
  secretArn: process.env.SECRET_ARN,
  resourceArn: process.env.CLUSTER_ARN,
  database: process.env.DB_NAME
})

export default db
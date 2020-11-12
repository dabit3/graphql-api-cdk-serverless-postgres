import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as rds from '@aws-cdk/aws-rds';
import * as appsync from '@aws-cdk/aws-appsync';

export class CdkAuroraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-blog-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY
        },
      },
    });

    const vpc = new ec2.Vpc(this, 'BlogAppVPC');
    const cluster = new rds.ServerlessCluster(this, 'AuroraBlogCluster', {
      engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
      parameterGroup: rds.ParameterGroup.fromParameterGroupName(this, 'ParameterGroup', 'default.aurora-postgresql10'),
      defaultDatabaseName: 'BlogDB',
      vpc,
      enableDataApi: true,
    });

    const postFn = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('lambda-handler'),
      environment: {
        CLUSTER_ARN: cluster.clusterArn,
        SECRET_ARN: cluster?.secret?.secretArn || '',
      },
    });
    postFn.addEnvironment('DB_NAME', 'BlogDB');
    cluster.grantDataApiAccess(postFn)

    // set the new Lambda function as a data source for the AppSync API
    const lambdaDs = api.addLambdaDataSource('lambdaDatasource', postFn);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "listPosts"
    });
    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "createPost"
    });
  
  }
}

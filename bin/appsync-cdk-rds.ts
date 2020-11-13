#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AppsyncCdkRdsStack } from '../lib/appsync-cdk-rds-stack';

const app = new cdk.App();
new AppsyncCdkRdsStack(app, 'AppsyncCdkRdsStack');

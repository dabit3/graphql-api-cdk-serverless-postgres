#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkAuroraStack } from '../lib/cdk-aurora-stack';

const app = new cdk.App();
new CdkAuroraStack(app, 'CdkAuroraStack');

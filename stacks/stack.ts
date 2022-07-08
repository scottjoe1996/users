#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { CognitoStack } from './cognito/cognito-stack';
import { getStackProps } from './config/config';

const app = new cdk.App();

new CognitoStack(app, 'CognitoStack', getStackProps({}));

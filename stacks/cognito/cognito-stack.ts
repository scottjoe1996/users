import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { CustomStackProps } from '../config/config';

import { CognitoConstruct } from './cognito-construct';
import { CognitoProps } from './cognito-props';

export class CognitoStack extends Stack {
  constructor(scope: Construct, id: string, props: CustomStackProps<CognitoProps>) {
    super(scope, id, props);

    new CognitoConstruct(this, props);
  }
}

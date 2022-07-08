import { Construct } from 'constructs';

import { CustomStackProps } from '../config/config';
import { CognitoProps } from './cognito-props';

export class CognitoConstruct extends Construct {
  constructor(scope: Construct, { customProps }: CustomStackProps<CognitoProps>) {
    super(scope, 'CognitoConstruct');

    // Cognito construct code goes here
  }
}

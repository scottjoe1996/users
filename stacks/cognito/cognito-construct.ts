import { Construct } from 'constructs';
import { AccountRecovery, UserPool, UserPoolClient, UserPoolClientIdentityProvider } from 'aws-cdk-lib/aws-cognito';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';

import { CustomStackProps } from '../config/config';
import { CognitoProps } from './cognito-props';

export class CognitoConstruct extends Construct {
  constructor(scope: Construct, _props: CustomStackProps<CognitoProps>) {
    super(scope, 'CognitoConstruct');

    const userPool = new UserPool(this, 'UserPool', {
      userPoolName: 'Users',
      selfSignUpEnabled: false,
      signInAliases: {
        username: true
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: true,
        requireSymbols: false
      },
      accountRecovery: AccountRecovery.NONE,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const userPoolClient = new UserPoolClient(this, 'UserPoolClient', {
      userPool,
      authFlows: {
        adminUserPassword: true,
        userPassword: true
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO]
    });

    new CfnOutput(this, 'userPoolId', {
      value: userPool.userPoolId
    });
    new CfnOutput(this, 'userPoolClientId', {
      value: userPoolClient.userPoolClientId
    });
  }
}

import { Construct } from 'constructs';
import { AccountRecovery, ClientAttributes, UserPool, UserPoolClient, UserPoolClientIdentityProvider } from 'aws-cdk-lib/aws-cognito';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';

import { CustomStackProps } from '../config/config';
import { CognitoProps } from './cognito-props';

export class CognitoConstruct extends Construct {
  constructor(scope: Construct, _props: CustomStackProps<CognitoProps>) {
    super(scope, 'CognitoConstruct');

    const userPool = new UserPool(this, 'UserPool', {
      userPoolName: 'Users',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true
      },
      autoVerify: {
        email: true
      },
      standardAttributes: {
        email: {
          mutable: true,
          required: true
        }
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
        userPassword: true,
        userSrp: true
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      readAttributes: new ClientAttributes().withStandardAttributes({ email: true, emailVerified: true }),
      writeAttributes: new ClientAttributes().withStandardAttributes({ email: true, emailVerified: false })
    });

    new CfnOutput(this, 'userPoolId', {
      value: userPool.userPoolId,
      exportName: 'userPoolId'
    });
    new CfnOutput(this, 'userPoolClientId', {
      value: userPoolClient.userPoolClientId,
      exportName: 'userPoolClientId'
    });
  }
}

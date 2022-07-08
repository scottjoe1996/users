import { StackProps } from 'aws-cdk-lib';

export interface CustomStackProps<T> extends StackProps {
  customProps: T;
}

export const getStackProps = <T>(customProps: T): CustomStackProps<T> => ({
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  customProps
});

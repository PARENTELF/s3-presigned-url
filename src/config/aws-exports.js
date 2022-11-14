const awsCognitoConfig = {
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id:
    'us-east-1:b6e0ebb3-c927-4a86-bd1b-e476071de0ec',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_CFwixbKJZ',
  aws_user_pools_web_client_id: '7oelrsikqh5tqa2e44mjr36lkr',
  oauth: {
    domain:
      'googletestc9d192bd-c9d192bd-staging.auth.us-east-1.amazoncognito.com',
    scope: [
      'phone',
      'email',
      'openid',
      'profile',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn:
      'https://main.dhfirge6qhpgf.amplifyapp.com/,http://localhost:3000/',
    redirectSignOut:
      'https://main.dhfirge6qhpgf.amplifyapp.com/,http://localhost:3000/',
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: ['GOOGLE'],
  aws_cognito_signup_attributes: ['EMAIL'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: ['SMS'],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
};

const presignedUrlDev = {
  bucketName: 'presigned-url-dev-presignedurldev997733e0-6qfj87dbgpl',
  apiUrl: 'https://so45jqxje9.execute-api.us-east-1.amazonaws.com/',
  region: 'us-east-1',
};

export { presignedUrlDev, awsCognitoConfig };

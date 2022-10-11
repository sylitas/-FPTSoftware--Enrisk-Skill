import AWS from 'aws-sdk';

const cognito = new AWS.CognitoIdentityServiceProvider();

export const createUser = async (params) => cognito.adminCreateUser(params).promise();

export const setUserPassword = async (params) => cognito.adminSetUserPassword(params).promise();

export const initiateAuth = async (params) => cognito.adminInitiateAuth(params).promise();

export const forgotPassword = async (params) => cognito.forgotPassword(params).promise();

export const confirmForgotPassword = async (params) => cognito.confirmForgotPassword(params).promise();

export const changePassword = async (params) => cognito.changePassword(params).promise();

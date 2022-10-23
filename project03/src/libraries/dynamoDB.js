import AWS from 'aws-sdk';

const documentClient = new AWS.DynamoDB.DocumentClient();

export const put = async (params) => documentClient.put(params).promise();

export const query = async (params) => documentClient.query(params).promise();

export const update = async (params) => documentClient.update(params).promise();

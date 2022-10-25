import AWS from 'aws-sdk';

const documentClient = new AWS.DynamoDB.DocumentClient();

export const put = async (params) => documentClient.put(params).promise();

export const query = async (params) => documentClient.query(params).promise();

export const update = async (params) => documentClient.update(params).promise();

export const scan = async (params) => documentClient.scan(params).promise();

export const deleteRecord = async (params) => documentClient.delete(params).promise();

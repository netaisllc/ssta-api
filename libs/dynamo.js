// dynamo.js
// Simple DB helpers

import AWS from "aws-sdk";

export function call(action, params) {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    return dynamoDb[action](params).promise();
}
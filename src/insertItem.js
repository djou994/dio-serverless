"use strict"
const {v4} = require("uuid");
const {DynamoDBDocument} = require("@aws-sdk/lib-dynamodb"),
      {DynamoDB} = require("@aws-sdk/client-dynamodb");

const insertItem = async (event) => {
    const {item} = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = v4();

    const dynamoDB = DynamoDBDocument.from(new DynamoDB());

    const newItem = {
        id,
        item,
        createdAt,
        itemStatus: false
    }

    await dynamoDB.put(
        {
            TableName: "ItemTableNew",
            Item: newItem
        }
    )

    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    }
}

module.exports = {
    handler: insertItem
}
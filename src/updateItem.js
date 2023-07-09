"use strict"

const {DynamoDBDocument} = require("@aws-sdk/lib-dynamodb"),
    {DynamoDB} = require("@aws-sdk/client-dynamodb");

const updateItem = async (event) => {

    const {itemStatus} = JSON.parse(event.body);
    const {id} = event.pathParameters

    const dynamodb = DynamoDBDocument.from(new DynamoDB());

        await dynamodb.update({
            TableName: "ItemTableNew",
            Key: {id},
            UpdateExpression: 'set itemStatus = :itemStatus',
            ExpressionAttributeValues: {
                ':itemStatus': itemStatus
            },
            ReturnValues: "ALL_NEW"
        });

    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'Item updated'
        })
    }
}

module.exports = {
    handler: updateItem
}
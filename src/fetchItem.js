"use strict"

const {DynamoDBDocument} = require("@aws-sdk/lib-dynamodb"),
    {DynamoDB} = require("@aws-sdk/client-dynamodb");

const fetchItem = async (event) => {

    const dynamodb = DynamoDBDocument.from(new DynamoDB());
    let item;

    try {
        const {id} = event.pathParameters

        console.log("key: "+ id)

        item = await dynamodb.get({
            TableName: "ItemTableNew",
            Key: {id}
        }).then(function (data) {
            return data.Item
        });
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item)
    }
}

module.exports = {
    handler: fetchItem
}
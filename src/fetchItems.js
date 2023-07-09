"use strict"

const {DynamoDBDocument} = require("@aws-sdk/lib-dynamodb"),
    {DynamoDB} = require("@aws-sdk/client-dynamodb");

const fetchItems = async (event) => {

    const dynamodb = DynamoDBDocument.from(new DynamoDB());
    let items;

    try {
        items = await dynamodb.scan({
            TableName: "ItemTableNew"
        }).then(function (data) {
            return data.Items
        });
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items)
    }
}

module.exports = {
    handler: fetchItems
}
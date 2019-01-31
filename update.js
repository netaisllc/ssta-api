// update.js
// UPDATE a note in the data store
import * as db              from "./libs/dynamo";
import { success, failure } from "./libs/response";

export async function main( event, context ) {
    // Request body is passed as a JSON encoded string in 'event.body'
    const UPDATE = "update";
    const data = JSON.parse( event.body );

    const params = {
        TableName: "notes",
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null
        },
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await db.call( UPDATE, params );
        return success({ status: true });
    } 
    catch( e ) {
        return failure( {
            status: false,
            rawError: e
        })
    }
}
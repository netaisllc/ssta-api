// delete.js
// REMOVE a note from the data store
import * as db              from "./libs/dynamo";
import { success, failure } from "./libs/response";

export async function main( event, context ) {
    // Request body is passed as a JSON encoded string in 'event.body'
    const DELETE = "delete";

    const params = {
        TableName: "notes",
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await db.call( DELETE, params);
        return success({ status: true });
    } 
    catch( e ) {
        return failure( {
            status: false,
            rawError: e
        })
    }
}
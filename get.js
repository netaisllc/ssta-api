// get.js
// GET a note from the data store by Key
import * as db              from "./libs/dynamo";
import { success, failure } from "./libs/response";

export async function main( event, context ) {
    // Request body is passed as a JSON encoded string in 'event.body'
    const GET = "get";

    const params = {
        TableName: "notes",
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
          userId: event.requestContext.identity.cognitoIdentityId,
          noteId: event.pathParameters.id
        }
    };

    try {
        const result = await db.call( GET, params );
        if( result.Item ) {
            return success( result.Item )
        }
        else {
            return failure({ status: false, error: "Item not found." });
        }
    }
    catch( e ) {
        return failure( {
            status: false,
            rawError: e
        })
    }
}
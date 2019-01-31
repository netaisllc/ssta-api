// create.js
// PUT a note to the data store
import uuid                 from "uuid";
import * as db              from "./libs/dynamo";
import { success, failure } from "./libs/response";

export async function main( event, context ) {
    // Request body is passed as a JSON encoded string in 'event.body'
    const PUT = "put";
    const data = JSON.parse( event.body );

    const params = {
        TableName: "notes",
        // 'Item' contains the attributes of the item to be created
        // - 'userId': user identities are federated through the
        //             Cognito Identity Pool, we will use the identity id
        //             as the user id of the authenticated user
        // - 'noteId': a unique uuid
        // - 'content': parsed from request body
        // - 'attachment': parsed from request body
        // - 'createdAt': current Unix timestamp
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try {
        await db.call( PUT, params );
        return success( params.Item )
    } 
    catch( e ) {
        return failure( {
            status: false,
            rawError: e
        })
    }
}
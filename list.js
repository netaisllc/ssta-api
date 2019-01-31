// list.js
// Readd all items for a given usr id
import * as db from "./libs/dynamo";
import { success, failure } from "./libs/response";

export async function main(event, context) {
    const QUERY = "query";

    const params = {
        TableName: "notes",
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId'
        //   partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be Identity Pool identity id
        //   of the authenticated user
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
        ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };

    try {
        const result = await db.call( QUERY, params);
        // Return the matching list of items in response body
        return success(result.Items);
    } 
    catch( e ) {
        return failure( {
            status: false,
            rawError: e
        })
    }
}
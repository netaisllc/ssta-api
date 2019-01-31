// responses.js
// Simple HTTP responses

export function success( body ) {
    return buildResponse( 200, body );
}
  
export function failure( body)  {
    let statusCode;
    if( body.rawError ) {
        body.error = {}
        body.error.code = body.rawError.statusCode;
        body.error.message = body.rawError.message;       
        statusCode = ( body.rawError.statusCode >= 400 && body.rawError.statusCode <= 410 ) ? body.rawError.statusCode : 500;
        delete body.rawError;
    }
    else {
        statusCode = 500;
    }    
    return buildResponse( statusCode, body );
}

function buildResponse( statusCode, body ) {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify( body )
    };
}
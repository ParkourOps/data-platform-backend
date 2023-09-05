export type HttpRequestMethod = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

export type HttpResponseStatus = 
                        | 200 // OK
                        | 204 // NO CONTENT
                        | 400 // BAD REQUEST
                        | 401 // UNAUTHORISED
                        | 403 // FORBIDDEN
                        | 404 // NOT FOUND
                        | 405 // METHOD NOT ALLOWED
                        | 500 // INTERNAL SERVER ERROR
                        | 501 // NOT IMPLEMENTED
                        | 503 // SERVICE UNAVAILABLE
;

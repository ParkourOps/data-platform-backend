import { z } from "zod";
import { makeMiddleware } from "@framework";

export default makeMiddleware("Authentication", async (request, exit)=>{
    const auth = request.headers.authorization;
    try {
        z.string().regex(/^Bearer [a-zA-Z0-9]+$/).parse(auth);
    } catch {
        exit({
            status: 401,
            userFriendlyMessage: "Invalid auth token!",
            data: undefined
        });
    }
    return request; // <-- must forward request to next middleware!
})
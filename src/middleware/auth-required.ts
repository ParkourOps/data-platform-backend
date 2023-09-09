// import {  } from "zod";
import { makeMiddleware } from "@framework";
import firebase from "../firebase";

export default makeMiddleware("Authentication Required (Guard)", async (request, exit)=>{
    const auth = request.headers.authorization?.replace(/^(bearer )/i, "");
    try {
        if (!auth) {
            throw Error();
        }
        const verificationResult = await firebase.auth.verifyIdToken(auth);
        request.body.auth = {
            uid: verificationResult.uid
        }
        return request;
    } catch {
        exit({
            status: 401,
            userFriendlyMessage: "Invalid auth token!",
            data: undefined
        });
    }
    return request; // <-- must forward request to next middleware!
})

import { z } from "zod";
import Auth from "../../model/auth";
import UserProfile from "../../model/user-profile";
import firebase from "../../firebase";
import authRequired from "@middleware/auth-required";
import { makeRouteHandler } from "../../../server/json-rest-api-route-handler";
import { httpResponseStatus } from "../../../server/http";

export default makeRouteHandler({
    request: z.object({
        auth: Auth,
        delta: UserProfile.omit({id: true}).partial()
    }),
    response: UserProfile,
    middleware: [
        authRequired
    ],
    async handler(request) {
        await firebase.firestore.collection("user").doc(request.auth.uid).update(request.delta);
        try {
            const readBack = UserProfile.parse((await firebase.firestore.collection("user").doc(request.auth.uid).get()).data());
            return {
                status: httpResponseStatus.OK,
                userFriendlyMessage: "User profile updated.",
                data: readBack
            }
        } catch {
            return {
                status: httpResponseStatus.INTERNAL_SERVER_ERROR,
                userFriendlyMessage: "Failed to parse user profile.",
                data: undefined
            }
        }
    }
});

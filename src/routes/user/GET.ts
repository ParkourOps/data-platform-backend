import authRequired from "@middleware/auth-required";
import Auth from "../../model/auth";
import UserProfile from "../../model/user-profile";
import { z } from "zod";
import firebase from "../../firebase";
import { makeRouteHandler } from "../../../server/json-rest-api-route-handler";
import { httpResponseStatus } from "../../../server/http";

export default makeRouteHandler({
    request: z.object({
        auth: Auth
    }),
    response: UserProfile,
    middleware: [
        authRequired
    ],
    async handler(request) {
        const rawUserRecord = (await firebase.firestore.collection("user").doc(request.auth.uid).get()).data();
        if (rawUserRecord) {
            try {
                return {
                    status: httpResponseStatus.OK,
                    userFriendlyMessage: "User profile found.",
                    data: UserProfile.parse(rawUserRecord)
                }
            } catch {
                return {
                    status: httpResponseStatus.INTERNAL_SERVER_ERROR,
                    userFriendlyMessage: "Failed to parse user profile.",
                    data: undefined
                }
            }
        } else {
            return {
                status: httpResponseStatus.NOT_FOUND,
                userFriendlyMessage: "User profile not found.",
                data: undefined
            }
        }
    }
});

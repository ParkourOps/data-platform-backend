import authRequired from "@middleware/auth-required";
import Auth from "../../model/auth";
import UserProfile from "../../model/user-profile";
import { z } from "zod";
import firebase from "../../firebase";
import { makeRouteHandler } from "../../../server/json-rest-api-route-handler";
import { httpResponseStatus } from "../../../server/http";
import locale from "../../locale";

export default makeRouteHandler({
    description: "Get own user profile if logged in.",
    request: z.object({
        auth: Auth
    }),
    response: UserProfile,
    middleware: [
        authRequired
    ],
    async handler(request) {
        try {
            const data = (await firebase.firestore.collection("user").doc(request.auth.uid).get()).data();
            if (data) {
                return {
                    status: httpResponseStatus.OK,
                    userFriendlyMessage: locale.resourceRead("user profile"),
                    data: UserProfile.parse(data)
                }     
            } else {
                return {
                    status: httpResponseStatus.NOT_FOUND,
                    userFriendlyMessage: locale.resourceNotFound("user profile"),
                    data: undefined
                }
            }
        } catch {
            return {
                status: httpResponseStatus.INTERNAL_SERVER_ERROR,
                userFriendlyMessage: locale.resourceReadFail("user profile"),
                data: undefined
            }
        }
    }
});

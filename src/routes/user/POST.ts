import { z } from "zod";
import firebase from "../../firebase";
import authRequired from "@middleware/auth-required";
import Auth from "../../model/auth";
import { makeRouteHandler } from "../../../server/json-rest-api-route-handler";
import { httpResponseStatus } from "../../../server/http";
import UserProfile from "../../model/user-profile";
import locale from "../../locale";

export default makeRouteHandler({
    description: "Create new user profile based on log in token.",
    request: z.object({
        auth: Auth
    }),
    response: UserProfile,
    middleware: [
        authRequired
    ],
    async handler(request) {
        try {
            const userRecord = await firebase.auth.getUser(request.auth.uid);
            const ref = (firebase.firestore).collection("user").doc(userRecord.uid);
            if (!(await ref.get()).exists) {
                const userProfile : z.infer<typeof UserProfile> = {
                    id: userRecord.uid,
                    email: userRecord.email,
                    emailVerified: userRecord.emailVerified,
                    displayName: userRecord.displayName,
                    photoURL: userRecord.photoURL,
                    phoneNumber: userRecord.phoneNumber
                }
                await firebase.firestore.collection("user").doc(userRecord.uid).set(userProfile);
                return {
                    status: httpResponseStatus.CREATED,
                    userFriendlyMessage: locale.resourceCreated("user profile"),
                    data: userProfile
                }
            } else {
                return {
                    status: httpResponseStatus.BAD_REQUEST,
                    userFriendlyMessage: locale.resourceAlreadyExists("user profile"),
                    data: undefined
                }
            }
        } catch {
            return {
                status: httpResponseStatus.INTERNAL_SERVER_ERROR,
                userFriendlyMessage: locale.resourceCreateFail("user profile"),
                data: undefined
            }            
        }
    },
});

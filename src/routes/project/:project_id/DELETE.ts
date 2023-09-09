import { z } from "zod";
import { makeRouteHandler } from "../../../../server/json-rest-api-route-handler";
import firebase from "../../../firebase";
import { httpResponseStatus } from "../../../../server/http";
import authRequired from "@middleware/auth-required";
import Project from "../../../model/project";
import Auth from "../../../model/auth";
import locale from "../../../locale";
import projectFetch from "@middleware/project/project-fetch";


export default makeRouteHandler({
    description: "Delete the project at this ID.",
    request: z.object({
        auth: Auth,
        project: Project
    }),
    response: z.undefined(),
    middleware: [
        authRequired,
        projectFetch("owners-only")
    ],    
    async handler(request) {
        try {
            const ref = firebase.firestore.collection("project").doc(request.project.id);
            await ref.delete();
            return {
                status: httpResponseStatus.OK,
                userFriendlyMessage: locale.resourceDeleted("project"),
                data: undefined
            }
        } catch {
            return {
                status: httpResponseStatus.INTERNAL_SERVER_ERROR,
                userFriendlyMessage: locale.resourceDeleteFail("project"),
                data: undefined
            }            
        }
    },
});
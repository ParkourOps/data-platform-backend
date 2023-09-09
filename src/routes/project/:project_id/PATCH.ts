import { z } from "zod";
import { makeRouteHandler } from "../../../../server/json-rest-api-route-handler";
import authRequired from "@middleware/auth-required";
import projectFetch from "@middleware/project/project-fetch";
import Auth from "../../../model/auth";
import Project from "../../../model/project";
import firebase from "../../../firebase";
import { httpResponseStatus } from "../../../../server/http";
import locale from "../../../locale";

export default makeRouteHandler({
    description: "Update the project's name and description.",
    request: z.object({
        auth: Auth,
        project: Project,
        delta: Project.pick({name: true, description: true}).partial()
    }),
    response: Project,
    middleware: [
        authRequired,
        projectFetch("owners-only")
    ],
    async handler(request) {
        try {
            const ref = firebase.firestore.collection("project").doc(request.project.id);
            await ref.update(request.delta);
            const readBack = Project.parse((await ref.get()).data());
            return {
                status: httpResponseStatus.OK,
                userFriendlyMessage: locale.resourceUpdated("project"),
                data: readBack
            }
        } catch {
            return {
                status: httpResponseStatus.INTERNAL_SERVER_ERROR,
                userFriendlyMessage: locale.resourceUpdateFail("project"),
                data: undefined
            }
        }
    },
})
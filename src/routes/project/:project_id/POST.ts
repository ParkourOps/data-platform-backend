import { z } from "zod";
import { makeRouteHandler } from "../../../../server/json-rest-api-route-handler";
import firebase from "../../../firebase";
import { httpResponseStatus } from "../../../../server/http";
import Project from "../../../model/project";
import authRequired from "@middleware/auth-required";
import Auth from "../../../model/auth";
import locale from "../../../locale";

export default makeRouteHandler({
    description: "Create the (new) project for this ID.",
    request: z.object({
        auth: Auth,
        data: Project.pick({name: true, description: true})
    }),
    response: Project,
    middleware: [
        authRequired
    ],
    async handler(request, params) {
        try {
            const projectId = params.project_id;
            const ref = firebase.firestore.collection("project").doc(projectId);
            if (!(await ref.get()).exists) {
                const project : z.infer<typeof Project> = {
                    id: projectId,
                    name: request.data.name,
                    description: request.data.description,
                    users: {
                        owners: [
                            request.auth.uid
                        ],
                        editors: [],
                        auditors: []
                    }
                };
                ref.set(project);
                return {
                    status: httpResponseStatus.CREATED,
                    userFriendlyMessage: locale.resourceCreated("project"),
                    data: project
                }
            } else {
                return {
                    status: httpResponseStatus.BAD_REQUEST,
                    userFriendlyMessage: locale.resourceAlreadyExists("project"),
                    data: undefined
                }                
            }
        } catch {
            return {
                status: httpResponseStatus.INTERNAL_SERVER_ERROR,
                userFriendlyMessage: locale.resourceCreateFail("project"),
                data: undefined
            }
        }
    }
})
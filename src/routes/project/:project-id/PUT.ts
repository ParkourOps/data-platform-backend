import { z } from "zod";
import { makeRouteHandler } from "../../../../server/json-rest-api-route-handler";
import firebase from "../../../firebase";
import { httpResponseStatus } from "../../../../server/http";
import Project from "../../../model/project";
import authRequired from "@middleware/auth-required";
import Auth from "../../../model/auth";

export default makeRouteHandler({
    request: z.object({
        auth: Auth,
        id: z.string().nonempty(),
        name: z.string().nonempty(),
        description: z.string().nonempty().optional()
    }),
    response: Project,
    middleware: [
        authRequired
    ],
    async handler(request) {
        const ref = firebase.firestore.collection("project").doc(request.id);
        if (!(await ref.get()).exists) {
            const project : z.infer<typeof Project> = {
                id: request.id,
                name: request.name,
                description: request.description,
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
                userFriendlyMessage: "Project created.",
                data: project
            }
        } else {
            return {
                status: httpResponseStatus.BAD_REQUEST,
                userFriendlyMessage: "Project already exists.",
                data: undefined
            }
        }
    }
})
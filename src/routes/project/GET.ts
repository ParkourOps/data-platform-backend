import { z } from "zod";
import { makeRouteHandler } from "../../../server/json-rest-api-route-handler";
import Auth from "../../model/auth";
import Project from "../../model/project";
import { httpResponseStatus } from "../../../server/http";
import locale from "../../locale";
import authRequired from "@middleware/auth-required";
import firebase from "../../firebase";

export default makeRouteHandler({
    description: "Get all projects associated with the user.",
    request: z.object({
        auth: Auth
    }),
    response: z.object({
        ownerOf: Project.array(),
        editorOf: Project.array(),
        auditorOf: Project.array(),
    }),
    middleware: [
        authRequired
    ],
    async handler(request) {
        try {
            const fetch = await Promise.all([
                firebase.firestore.collection("project").where("users.owners", "array-contains", request.auth.uid).get(),
                firebase.firestore.collection("project").where("users.editors", "array-contains", request.auth.uid).get(),
                firebase.firestore.collection("project").where("users.auditors", "array-contains", request.auth.uid).get()
            ]);
            const ownedProjects = fetch[0].docs.map((doc)=>Project.parse(doc.data()));
            const editedProjects = fetch[1].docs.map((doc)=>Project.parse(doc.data()));
            const auditedProjects = fetch[2].docs.map((doc)=>Project.parse(doc.data()));
            return {
                status: httpResponseStatus.OK,
                userFriendlyMessage: locale.resourceRead("projects"),
                data: {
                    ownerOf: ownedProjects,
                    editorOf: editedProjects,
                    auditorOf: auditedProjects
                }
            }
        } catch {
            return {
                status: httpResponseStatus.INTERNAL_SERVER_ERROR,
                userFriendlyMessage: locale.resourceReadFail("projects"),
                data: undefined
            }
        }
    }
})
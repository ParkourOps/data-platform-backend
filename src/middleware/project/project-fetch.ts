import { httpResponseStatus } from "../../../server/http";
import { makeMiddleware } from "../../../server/json-rest-api-middleware";
import firebase from "../../firebase";
import locale from "../../locale";
import Project from "../../model/project";

export default (restriction: "owners-only" | "members-only") => makeMiddleware("Project Fetch", async (request, exit)=>{
    try {
        const userId = request.body?.auth?.uid; // <-- this middleware must run after auth-required middleware!
        const projectId = request.params?.project_id;
        const ref = firebase.firestore.collection("project").doc(projectId);
        const data = (await ref.get()).data();
        if (!data) {
            exit({
                status: httpResponseStatus.NOT_FOUND,
                userFriendlyMessage: locale.resourceNotFound("project"),
                data: undefined
            })
        } else {
            const project = Project.parse(data);
            let allowAccess = false;
            switch (restriction) {
                case "owners-only":
                    allowAccess = project.users.owners.includes(userId);
                    break;
                case "members-only":
                    allowAccess = project.users.auditors.includes(userId) || project.users.editors.includes(userId) || project.users.owners.includes(userId);
                    break;
            }
            if (!allowAccess) {
                exit({
                    status: httpResponseStatus.FORBIDDEN,
                    userFriendlyMessage: locale.resourceForbidden("project"),
                    data: undefined
                })
            } else {
                request.body.project = Project.parse(data);
            }
        }
    } catch {
        exit({
            status: httpResponseStatus.INTERNAL_SERVER_ERROR,
            userFriendlyMessage: locale.resourceReadFail("project"),
            data: undefined
        })
    }
    return request; // <-- must forward request to next middleware!
})

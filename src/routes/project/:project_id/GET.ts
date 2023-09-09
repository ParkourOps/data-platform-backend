import { z } from "zod";
import { makeRouteHandler } from "../../../../server/json-rest-api-route-handler";
import Auth from "../../../model/auth";
import Project from "../../../model/project";
import { httpResponseStatus } from "../../../../server/http";
import locale from "../../../locale";
import authRequired from "@middleware/auth-required";
import projectFetch from "@middleware/project/project-fetch";

export default makeRouteHandler({
    description: "Read the project.",
    request: z.object({
        auth: Auth,
        project: Project
    }),
    response: Project,
    middleware: [
        authRequired,
        projectFetch("members-only")
    ],        
    async handler(request) {
        try {
            return {
                status: httpResponseStatus.OK,
                userFriendlyMessage: locale.resourceRead("project"),
                data: request.project
            }
        } catch {
            return {
                status: httpResponseStatus.INTERNAL_SERVER_ERROR,
                userFriendlyMessage: locale.resourceReadFail("project"),
                data: undefined
            }
        }
    },
})
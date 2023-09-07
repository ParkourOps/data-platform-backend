import { z } from "zod";
import { makeRouteHandler } from "../../../../server/json-rest-api-route-handler";
import authRequired from "@middleware/auth-required";
import Auth from "../../../model/auth";
import { generateUniqueId } from "../../../utils/random-generators";
import { httpResponseStatus } from "../../../../server/http";

export default makeRouteHandler({
    request: z.object({
        auth: Auth
    }),
    response: z.object({
        id: z.string().nonempty()
    }),
    middleware: [
        authRequired
    ],
    async handler() {
        return {
            status: httpResponseStatus.OK,
            userFriendlyMessage: "Random project ID generated.",
            data: {
                id: generateUniqueId("proj")
            }
        }
    }
});

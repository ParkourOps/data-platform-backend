import { z } from "zod";
import { makeRouteHandler } from "@framework";
import auth from "@middleware/auth";

export default makeRouteHandler(
    {
        request: z.object({
            msg: z.literal("PING")
        }),
        response: z.undefined(),
        middleware: [
            auth
        ],
        async handler(request, params){
            return {
                status: 200,
                userFriendlyMessage: `PONG right back at you, ${params.user}.`,
                data: undefined
            }
        }
    }
);

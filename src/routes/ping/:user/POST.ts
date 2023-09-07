import { z } from "zod";
import { makeRouteHandler } from "@framework";
import auth from "@middleware/auth";

export default makeRouteHandler(
    {
        description: "Ping pong implementation: takes messages that must be 'PING' and responds with 'PONG' back to the user.",
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

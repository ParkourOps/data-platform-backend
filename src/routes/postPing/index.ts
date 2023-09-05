import { z } from "zod";
import { makeRoute } from "@framework";
import auth from "@middleware/auth";

export default makeRoute(
    "POST", "/ping", {
        request: z.object({
            user: z.string().nonempty(),
            msg: z.literal("PING")
        }),
        response: z.undefined(),
        middleware: [
            auth
        ],
        handler(input){
            return {
                status: 200,
                userFriendlyMessage: `PONG right back at you, ${input.user}.`,
                data: undefined
            }
        }
    }
);

import { z } from "zod";

export default z.object({
    uid: z.string().nonempty()
});
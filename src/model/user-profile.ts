import { z } from "zod";

export default z.object({
    id: z.string().nonempty(),
    email: z.string().optional(),
    emailVerified: z.boolean(),
    displayName: z.string().optional(),
    photoURL: z.string().optional(),
    phoneNumber: z.string().optional()
});

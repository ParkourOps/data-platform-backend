import { z } from "zod";

export default z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    description: z.string(),
    users: z.object({
        owners: z.array(z.string().nonempty()).min(0),
        editors: z.array(z.string().nonempty()),
        auditors: z.array(z.string().nonempty())
    })
});


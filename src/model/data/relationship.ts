import { z } from "zod";
import Attributes from "./attributes";
import Entity from "./entity";

export default z.object({
    id: z.string().nonempty(),
    type: z.string().nonempty(),
    attributes: Attributes,
    from: Entity.or(z.string().nonempty()),
    to: Entity.or(z.string().nonempty())
});
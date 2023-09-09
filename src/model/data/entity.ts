import { z } from "zod";
import Attributes from "./attributes";

export default z.object({
    id: z.string().nonempty(),
    sets: z.array(z.string().nonempty()),
    attributes: Attributes
});
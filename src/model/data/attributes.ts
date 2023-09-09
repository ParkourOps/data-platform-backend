import { z } from "zod";

const AttributeValue =  z.string()
                        .or(z.string().array())
                        .or(z.number())
                        .or(z.number().array())
                        .or(z.boolean())
                        .or(z.boolean().array())
;

export type TAttributeValue = z.infer<typeof AttributeValue>;

export default z.record(z.string(), AttributeValue);
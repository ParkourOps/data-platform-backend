import { UnknownKeysParam, ZodObject, ZodRawShape, ZodTypeAny } from "zod";

export type QuerySchema<
    A extends ZodRawShape,
    B extends UnknownKeysParam,
    C extends ZodTypeAny,
    D,
> = ZodObject<A,B,C,D,D>;
import { UnknownKeysParam, ZodObject, ZodRawShape, ZodTypeAny } from "zod";

export type RequestSchema<
    A extends ZodRawShape,
    B extends UnknownKeysParam,
    C extends ZodTypeAny,
    D,
> = ZodObject<A,B,C,D,D>;

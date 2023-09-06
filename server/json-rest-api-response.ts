import { Response } from "express"
import { UnknownKeysParam, ZodObject, ZodRawShape, ZodTypeAny, ZodUndefined } from "zod";
import { HttpResponseStatusCode } from "./http";

export type JsonRestApiResponse<T> = {
    status: HttpResponseStatusCode,
    userFriendlyMessage: string,
    data: T
}

export type ResponseSchema<
    F extends ZodRawShape,
    G extends UnknownKeysParam,
    H extends ZodTypeAny,
    I,
> = ZodObject<F,G,H,I,I> | ZodUndefined;

export function makeResponder<T>(expressResponse: Response) {
    return {
        respond(responseObj: JsonRestApiResponse<T>) {
            expressResponse.status(responseObj.status).send(responseObj);
            return;
        }
    } as const;
}

export type Responder<T> = ReturnType<typeof makeResponder<T>>;

export const BAD_REQUEST_RESPONSE = (msg: string) => ({
    status: 400,
    userFriendlyMessage: msg,
    data: undefined
}) as const;

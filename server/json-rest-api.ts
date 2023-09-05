import { UnknownKeysParam, ZodRawShape, ZodTypeAny } from "zod";
import { HttpRequestMethod } from "./http";
import express from "express";
import { JsonRestApiControllerMiddlewareStack, runMiddlewareStack } from "./json-rest-api-middleware";
import { BAD_REQUEST_RESPONSE, JsonRestApiResponse, ResponseSchema, makeResponder } from "./json-rest-api-response";
import { RequestSchema } from "./json-rest-api-request";

type Request = express.Request;
type Response = express.Response;

export class JsonRestApiRoute<
    A extends ZodRawShape,
    B extends UnknownKeysParam,
    C extends ZodTypeAny,
    D,
    F extends ZodRawShape,
    G extends UnknownKeysParam,
    H extends ZodTypeAny,
    I,
> {
    readonly method
    readonly path
    readonly requestDataSchema
    readonly responseDataSchema
    readonly handler
    readonly #middleware
    constructor(
        method: HttpRequestMethod, 
        path: string,
        args: {
            request: RequestSchema<A,B,C,D>, 
            response: ResponseSchema<F,G,H,I>, 
            handler: (input: D) => JsonRestApiResponse<I>,
            middleware?: JsonRestApiControllerMiddlewareStack
    }) 
    {
        this.method = method;
        this.path = path;
        this.requestDataSchema = args.request;
        this.responseDataSchema = args.response;
        this.handler = args.handler;
        this.#middleware = args.middleware;
    }
    handle(request: Request, response: Response) {
        let rawRequest : Request | undefined = request;
        const responder = makeResponder<I|undefined>(response);
        // 1. parse request body
        const parseRequestBodyResult = this.requestDataSchema.safeParse(rawRequest.body);
        if (!parseRequestBodyResult.success) {
            return responder.respond(BAD_REQUEST_RESPONSE("Request does not match schema. Please see OPTIONS response."));
        }
        // 2. run middleware stack if present
        if (this.#middleware) {
            rawRequest = runMiddlewareStack(this.#middleware, rawRequest, responder);
            if (!rawRequest) return;
        }
        //run the handler
        const result = this.handler(parseRequestBodyResult.data);
        return responder.respond(result);
    }
}

export type JsonRestApi = {
    name: string,
    description: string,
    version: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routes: JsonRestApiRoute<ZodRawShape,UnknownKeysParam,ZodTypeAny,any,ZodRawShape,UnknownKeysParam,ZodTypeAny,any>[],
}

export function makeRoute<
    A extends ZodRawShape,
    B extends UnknownKeysParam,
    C extends ZodTypeAny,
    D,
    F extends ZodRawShape,
    G extends UnknownKeysParam,
    H extends ZodTypeAny,
    I
>(...args: ConstructorParameters<typeof JsonRestApiRoute<A,B,C,D,F,G,H,I>>) {
    return new JsonRestApiRoute(...args);
}

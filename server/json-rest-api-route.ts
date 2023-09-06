import { UnknownKeysParam, ZodRawShape, ZodTypeAny } from "zod";
import { JsonRestApiRouteHandler } from "./json-rest-api-route-handler";
import { getAllFilesInSubdirectories } from "./utils";
import { httpRequestMethod } from "./http";

export type JsonRestApiRoute<
    A extends ZodRawShape,
    B extends UnknownKeysParam,
    C extends ZodTypeAny,
    D,
    F extends ZodRawShape,
    G extends UnknownKeysParam,
    H extends ZodTypeAny,
    I,
    J extends ZodRawShape,
    K extends UnknownKeysParam,
    L extends ZodTypeAny,
    M
> = {
    method: string,
    path: string,
    handler: JsonRestApiRouteHandler<A, B, C, D, F, G, H, I, J, K, L, M>
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonRestApiRouteAny<TReq = any, TRes = any, TQry = any> = JsonRestApiRoute<ZodRawShape, UnknownKeysParam, ZodTypeAny, TReq, ZodRawShape, UnknownKeysParam, ZodTypeAny, TRes, ZodRawShape, UnknownKeysParam, ZodTypeAny, TQry>;

export async function loadRoutesFromPath(fullpath: string) : Promise<JsonRestApiRouteAny[]> {
            // load routes
            const routes : JsonRestApiRouteAny[] = [];
            const routeFiles = getAllFilesInSubdirectories(fullpath).filter((file)=>file.endsWith(".ts"));
            for (const completeFilepath of routeFiles) {
                // extract file name (without file ext) and path
                const file = completeFilepath.replace(fullpath, "");
                const components = file.split("/");
                const fileName = components.pop();
                if (!fileName) {
                    console.error(`Could not parse filename: ${file}, ignoring...`);
                    continue;
                }
                const fileNameWithoutExt = fileName.replace(".ts", "");
                const path = components.join("/");
                if (!httpRequestMethod.includes(fileNameWithoutExt)) {
                    console.error(`[${path}/]${fileNameWithoutExt}[.ts] is not a recognised HTTP request method (${httpRequestMethod.join(', ')}), ignoring...`);
                    continue;
                }
                // load routes
                const fileContent = await import(completeFilepath);
                routes.push({
                    method: fileNameWithoutExt,
                    path,
                    handler: fileContent.default
                });
            }
            // return the routes
            return routes;
}
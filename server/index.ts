import {Server as HttpServer} from "http";
import express, { NextFunction } from "express"
import { JsonRestApiRouteAny, loadRoutesFromPath } from "./json-rest-api-route";
import { BAD_REQUEST_RESPONSE, makeResponder } from "./json-rest-api-response";
import { emit } from "./event-bus";
type Request = express.Request;
type Response = express.Response;


class Server {
    readonly name
    readonly description
    readonly version
    readonly routes
    readonly #serverApp
    #serverInstance: HttpServer | undefined

    private constructor(
        name: string,
        description: string,
        version: string,
        routes: JsonRestApiRouteAny[]
    ) {
        console.info(`creating server: ${name}`);
        this.name = name;
        this.description = description;
        this.version = version;
        this.routes = routes;
        // create server app
        this.#serverApp = express();
        // use json middleware
        this.#serverApp.use(express.json());
        // handle errors at the top-level
        this.#serverApp.use((error: Error, request: Request, response: Response, next: NextFunction) => {
            const responder = makeResponder(response);
            if (error instanceof SyntaxError) {
                responder.respond(BAD_REQUEST_RESPONSE("Request is not a valid JSON."));
            } else {
                next();
            }
        });
        // listen to exit sigs
        process.on("SIGINT", ()=>this.stop("SIGINT received."));
        process.on("SIGTERM", ()=>this.stop("SIGTERM received."));
        // install
        this.#installRoutes();
        console.info(`created server: ${name}`);
    }

    stop(why: string) {
        if (!this.#serverInstance) return;
        this.#serverInstance.close();
        console.info(`\nserver '${this.name}' stopped: ${why}`);
        emit("serverStopped", this.name, why);
    }

    start(port: number) {
        this.#serverInstance = this.#serverApp.listen(port, ()=>{
            console.info(`server '${this.name}' started on port: ${port}`);
            emit("serverStarted", this.name, port);
        });
    }

    static async make(
        name: string,
        description: string,
        version: string,
        routesDir: string
    ) {
        const routes = await loadRoutesFromPath(routesDir);
        return new Server(name, description, version, routes);
    }

    #installRoutes() {
        if (!this.#serverApp) return;
        this.routes.forEach((route)=>{
            const handler = (req:Request, res:Response)=>route.handler.handle.call(route.handler, req, res);
            const method = route.method;
            const path = route.path;
            switch (method) {
                case 'POST': 
                    this.#serverApp.post(path, handler);
                    break;
                case 'GET': 
                    this.#serverApp.get(path, handler);
                    break;
                case 'PUT': 
                    this.#serverApp.put(path, handler);
                    break;
                case 'PATCH': 
                    this.#serverApp.patch(path, handler);
                    break;
                case 'DELETE': 
                    this.#serverApp.delete(path, handler);
                    break;
            }
            console.info(`installed: ${method} ${path}`);
        });
    }    
}




export async function startNewServer(args: {
    name: string,
    description: string,
    version: string,
    routesDir: string
}, port: number) {
    const server = await Server.make(args.name, args.description, args.version, args.routesDir);
    server.start(port);
}
export { makeMiddleware } from "./json-rest-api-middleware";
export { makeRouteHandler} from "./json-rest-api-route-handler";
export { on as onServerEvent } from "./event-bus";
import { JsonRestApi } from "./json-rest-api";
import {Server as HttpServer} from "http";
import express, { NextFunction } from "express"
import { emit } from "./event-bus";
import { makeResponder } from "./json-rest-api-response";
type Request = express.Request;
type Response = express.Response;

class Server {
    #serverApp
    #server: HttpServer | undefined
    #spec
    constructor(spec: JsonRestApi) {
        console.info(`creating server: ${spec.name}`)
        // create server app
        this.#serverApp = express();
        this.#serverApp.use(express.json());
        this.#serverApp.use((error: Error, request: Request, response: Response, next: NextFunction) => {
            const responder = makeResponder(response);
            if (error instanceof SyntaxError) {
                responder.respond({
                    status: 400,
                    userFriendlyMessage: "Request is not a valid JSON.",
                    data: undefined
                })
            } else {
                next();
            }
        });
        // listen to exit sigs
        process.on("SIGINT", ()=>this.stop("SIGINT received."));
        process.on("SIGTERM", ()=>this.stop("SIGTERM received."));
        // initialise the server using spec
        this.#spec = spec;
        this.#initialise();
    }
    #initialise() {
        if (!this.#serverApp) return;
        // add handlers for the specific path entries
        this.#spec.routes.forEach((route) => {
            const method = route.method;
            const path = route.path;
            const handler = (req:Request, res:Response)=>route.handle.call(route, req, res)
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
        })
        // TODO: add OPTIONS on root and all subsequent paths here
    }
    stop(why: string) {
        if (!this.#server) return;
        this.#server.close();
        console.info(`\nserver '${this.#spec.name}' stopped: ${why}`);
        emit("serverStopped", this.#spec.name, why);
    }
    start(port: number) {
        this.#server = this.#serverApp.listen(port, ()=>{
            console.info(`server '${this.#spec.name}' started on port: ${port}`);
            emit("serverStarted", this.#spec.name, port);
        });
    }
}

export function startNewServer(port: number, spec: JsonRestApi) {
    const server = new Server(spec);
    server.start(port);
}
export { makeMiddleware } from "./json-rest-api-middleware";
export { makeRoute } from "./json-rest-api";
export { on as onServerEvent } from "./event-bus";
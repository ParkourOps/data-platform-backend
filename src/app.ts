import { startNewServer } from "@framework";
import pkg from "./package.json";
import postPing from "@routes/postPing";

startNewServer(process.env.PORT ? parseInt(process.env.PORT) : 3000, {
    name: "Test Service",
    description: "A service to test this declarative JSON API server.",
    version: pkg.version,
    routes: [
        postPing
    ]
});

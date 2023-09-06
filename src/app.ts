import { startNewServer } from "@framework";
import pkg from "../package.json";
import config from "@config";

startNewServer(
    {
        name: "Test Service",
        description: "A service to test this declarative JSON API server.",
        version: pkg.version,
        routesDir: `${__dirname}/routes`
    },
    config.PORT ?? 3000,
);

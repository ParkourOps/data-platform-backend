import config from "@config";
import { Neo4jAdapter } from "@parkour-ops/graph-db-port";
const neo4j = new Neo4jAdapter(
    config, 
    config, 
    config
);

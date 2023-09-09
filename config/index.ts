import { loadOptionalEnvironmentVariable, loadRequiredEnvironmentVariable } from "./env-vars";

export default {
    PORT: loadOptionalEnvironmentVariable("PORT", "number"),
    TEST_ACCOUNT_EMAIL: loadRequiredEnvironmentVariable("TEST_ACCOUNT_EMAIL", "string"),
    TEST_ACCOUNT_PASSWORD: loadRequiredEnvironmentVariable("TEST_ACCOUNT_PASSWORD", "string"),
    FIREBASE_SPA_API_KEY: loadRequiredEnvironmentVariable("FIREBASE_SPA_API_KEY", "string"),
    NEO4J_URL: loadRequiredEnvironmentVariable("NEO4J_URL"),
    NEO4J_USERNAME: loadRequiredEnvironmentVariable("NEO4J_USERNAME"),
    NEO4J_PASSWORD: loadRequiredEnvironmentVariable("NEO4J_PASSWORD"),
} as const;

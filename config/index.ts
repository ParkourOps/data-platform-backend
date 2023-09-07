import { loadOptionalEnvironmentVariable } from "./env-vars";

export default {
    PORT: loadOptionalEnvironmentVariable("PORT", "number"),
    TEST_ACCOUNT_EMAIL: loadOptionalEnvironmentVariable("TEST_ACCOUNT_EMAIL", "string"),
    TEST_ACCOUNT_PASSWORD: loadOptionalEnvironmentVariable("TEST_ACCOUNT_PASSWORD", "string"),
    FIREBASE_SPA_API_KEY: loadOptionalEnvironmentVariable("FIREBASE_SPA_API_KEY", "string")
} as const;

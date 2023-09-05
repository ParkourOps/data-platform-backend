import { loadOptionalEnvironmentVariable } from "./env-vars";

export default {
    PORT: loadOptionalEnvironmentVariable("PORT", "number")
} as const;

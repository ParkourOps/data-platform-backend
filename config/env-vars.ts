export type EnvironmentVariableType = "string" | "number" | "boolean";

export function loadOptionalEnvironmentVariable(
  key: string,
  asType: Extract<EnvironmentVariableType, "string">
): string | undefined;
export function loadOptionalEnvironmentVariable(
  key: string,
  asType: Extract<EnvironmentVariableType, "number">
): number | undefined;
export function loadOptionalEnvironmentVariable(
  key: string,
  asType: Extract<EnvironmentVariableType, "boolean">
): boolean
export function loadOptionalEnvironmentVariable(
  key: string,
  asType: EnvironmentVariableType
) {
  const val = process.env?.[key];
  if (!val) return undefined;
  switch (asType) {
    case "number":
      return parseInt(val);
    case "boolean":
      return ["true", "yes", "y", "1"].includes(val.toLowerCase()) ? true : false;
    default:
      return val;
  }
}

export function loadRequiredEnvironmentVariable(
  key: string,
  asType: Extract<EnvironmentVariableType, "string">
): string;
export function loadRequiredEnvironmentVariable(
  key: string,
  asType: Extract<EnvironmentVariableType, "number">
): number;
export function loadRequiredEnvironmentVariable(
  key: string,
  asType: Extract<EnvironmentVariableType, "boolean">
): boolean;
export function loadRequiredEnvironmentVariable(
  key: string,
  asType: EnvironmentVariableType
) {
  const val = process.env?.[key];
  if (!val)
    throw Error(`required environment variable has not been set: ${key}`);
  switch (asType) {
    case "number":
      return parseInt(val);
    case "boolean":
      return ["true", "yes", "y", "1"].includes(val.toLowerCase()) ? true : false;
    default:
      return val;
  }
}

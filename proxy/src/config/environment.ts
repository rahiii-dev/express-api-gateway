import dotenv from "dotenv";
dotenv.config();

const getEnvVar = (
  key: string,
  defaultValue?: string,
  expectedValues?: string[]
): string => {
  const value = process.env[key];

  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required but not defined.`);
  }

  if (expectedValues && expectedValues.length && !expectedValues.includes(value || defaultValue!)) {
    throw new Error(
      `Environment variable ${key} value must be one of (${expectedValues.join(", ")})'.`
    );
  }

  return value || defaultValue!;
};

interface AppConfig {
  env: "development" | "production";
  USER_SERVICE_PORT: string
}

const config: AppConfig = {
  env: getEnvVar("NODE_ENV", "development", ["development", "production"]) as "development" | "production",
  USER_SERVICE_PORT: getEnvVar('USER_SERVICE_PORT', '5001')
};

export default config;

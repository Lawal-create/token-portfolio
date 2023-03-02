import { DataValidationError, validate } from "./joi";
import joi, { SchemaLike } from "joi";

import dotenv from "dotenv";
import mapKeys from "lodash/mapKeys";

export const trimmedString = joi.string().trim();
export const trimmedRequiredString = trimmedString.required();

/**
 * Enviromental variables needed for the app to run
 */
export interface ApplicationEnv {
  port: number;
  node_env: string;
  api_version: string;
  auth_scheme: string;
  is_production: boolean;
  app_secret: string;
  application_name: string;
  crypto_compare_secret_key: string;
}

export class IncompleteEnvError extends Error {
  constructor(error: DataValidationError) {
    super(`Unable to load environment:\n${JSON.stringify(error.messages, null, 2)}`);
  }
}

/**
 * Loads all environment variables required to make the application work
 * @param schema validation schema to be used
 */
export function loadEnv<T>(schema: SchemaLike): T {
  dotenv.config();
  const processedEnv = mapKeys(process.env, (_, key) => {
    return key.toLowerCase();
  });

  try {
    return validate(processedEnv, schema);
  } catch (err) {
    if (err instanceof DataValidationError) {
      throw new IncompleteEnvError(err);
    }

    throw err;
  }
}

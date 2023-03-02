import { ApplicationEnv, loadEnv, trimmedRequiredString, trimmedString } from "@app/internal/env";

import joi from "joi";

const env = loadEnv<ApplicationEnv>({
  port: joi.number().required(),
  node_env: trimmedString.valid("dev", "test", "production", "staging").default("dev"),
  api_version: trimmedString.default("/api/v1"),
  auth_scheme: trimmedString.default("Bearer"),
  is_production: joi.when("node_env", {
    is: joi.valid("dev", "test"),
    then: joi.boolean().default(false),
    otherwise: joi.boolean().default(true)
  }),
  app_secret: trimmedRequiredString.min(32),
  application_name: trimmedString.default("sms-screener"),
  crypto_compare_secret_key: joi.string().required(),
});

export default env;

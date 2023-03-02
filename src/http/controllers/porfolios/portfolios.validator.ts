import joi from "joi";
import { tokens } from "@app/providers/cryptocompare";

export const isPortfolioValuationQuery = joi.object({
  token: joi.string().valid(...tokens),
  endDate: joi.date()
});

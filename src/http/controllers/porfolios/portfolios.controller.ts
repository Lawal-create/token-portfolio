import { autoValidate } from "@app/http/middlewares";
import { Controller } from "@app/internal/controller";
import { Request, Response } from "express";
import { controller, httpGet, queryParam, request, response } from "inversify-express-utils";
import { PortfolioValuationQuery } from "@app/portfolios";
import { isPortfolioValuationQuery } from "./portfolios.validator";
import { inject } from "inversify";
import TYPES from "@app/config/inversify.types";
import { PortfolioService } from "@app/portfolios";

@controller("/portfolio-valuation")
export class PortfolioValuationController extends Controller<any> {
  @inject(TYPES.PortfolioService) portfolioService: PortfolioService;
  @httpGet("/", autoValidate(isPortfolioValuationQuery, "query"))
  async getPortfolioValuation(@request() req: Request, @response() res: Response, @queryParam() query: PortfolioValuationQuery) {
    try{
      const data = await this.portfolioService.getTokenValuation(query);
      return this.send(req, res, data);
    }catch(err){
      console.log(err)
      throw err;
    }

  }
}
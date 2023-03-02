import { CryptoCompareClient, MultiPriceResponse } from "@app/providers/cryptocompare";
import { inject, injectable } from "inversify";

import { PortfolioValuationQuery } from "./portfolios.model";
import { ProcessCsv } from "@app/internal/formatter";
import TYPES from "@app/config/inversify.types";
import { roundCurrency } from "@app/internal/numbers";

@injectable()
export class PortfolioService{
    @inject(TYPES.CryptoCompareClient) cryptoCompare: CryptoCompareClient;

    async getTokenValuation(dto: PortfolioValuationQuery) : Promise<Record<string, number>>  {
        const { token, endDate } = dto
        const isDate = !!endDate;
        const portfolioMap = isDate ? await this.getPortfolioMap(endDate) : await this.getPortfolioMap();
        const tokens = [...portfolioMap.keys()]
        const tokenQuery = tokens.toString();
        const cryptoUsdPrices = await this.cryptoCompare.getMultipleTokenPrices({fsyms: tokenQuery, tsyms: "USD"})
        const response: Record<string, number> = {};
 
        if (token){
            return this.storeValuation(cryptoUsdPrices, token, response, portfolioMap)
        }

        tokens.map((value)=> {
            this.storeValuation(cryptoUsdPrices, value, response, portfolioMap)
        })
        
        return response;
    }

    /**
     * 
     * @param date optional date parameter to get the portfolio tokens valuation on that date
     * @returns 
     */
    private async getPortfolioMap(date?: Date): Promise<Map<string, number>>{
        const path = "../../transactions.csv"
        const map: Map<string, number> = await ProcessCsv(path, date) as any;
        return map;
    }

    private storeValuation(prices: MultiPriceResponse, value: string, record: Record<string, number>, map: Map<string, number> ){
        const price = Number(prices[value]["USD"]);
        const valuation = Number(map.get(value));
        const actualTokenValuation = roundCurrency(price * valuation);
        record[value] = actualTokenValuation;
        return record;
    }
}
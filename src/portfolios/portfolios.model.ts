export interface PortfolioValuationQuery {
    /**
     * token that should be sent to get for one specific token
     */
    token?: string;
    /**
     * date sent to get the portfolio valuation for token or tokens on that date.
     */
    endDate?: Date;
}
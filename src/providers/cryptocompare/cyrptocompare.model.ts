export const tokens = <const>["BTC", "ETH", "XRP"];
export type Token = typeof tokens[number];

export interface PriceQuery {
    /**
     * the crypto token we need the price of. e.g BTC, ETH, XRP
     */
    fsyms: string;
    /**
     * the currency we want the token price of. e.g USD, EUR
     */
    tsyms: string;
}

export interface SinglePriceResponse {
    [key: string]: number
}

export interface MultiPriceResponse {
    [key: string]: SinglePriceResponse
}

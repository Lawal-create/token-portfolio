import { MultiPriceResponse, PriceQuery } from './cyrptocompare.model';

import axios from 'axios';
import env from '@app/config/env';
import { injectable } from 'inversify';

@injectable()
export class CryptoCompareClient {
  /**
   * 
   * @param dto token and currency required to fetch the token prices
   * @returns 
   */
  async getMultipleTokenPrices(dto: PriceQuery): Promise<MultiPriceResponse> {
    const { fsyms, tsyms } = dto;
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${fsyms}&tsyms=${tsyms}`,
        {
        headers: {
            Authorization: `Bearer ${env.crypto_compare_secret_key}`,
            'Content-Type': 'application/json',
        },
        }
      );
    return data;
  } 
}
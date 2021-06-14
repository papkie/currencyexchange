import { Injectable, InternalServerErrorException } from '@nestjs/common';
import fetch from 'node-fetch';
import { RateFetchAllResponse } from './rate.dto';

//

interface NBPResponse {
  rates: Array<{
    currency: string;
    code: string;
    mid: number;
  }>;
}

@Injectable()
export class RateService {
  async fetchAll(): Promise<RateFetchAllResponse> {
    try {
      const response = await fetch(
        'http://api.nbp.pl/api/exchangerates/tables/a/?format=json',
      );
      const body: [NBPResponse] = await response.json();
      if (!(body?.[0]?.rates?.length > 0)) {
        return {};
      }
      return body[0].rates.reduce(
        (previous, current) => {
          previous[current.code] = current.mid;
          return previous;
        },
        { PLN: 1 } as RateFetchAllResponse,
      );
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}

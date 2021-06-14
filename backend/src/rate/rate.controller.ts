import { Controller, Get } from '@nestjs/common';
import { RateService } from './rate.service';

@Controller('rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  fetchAll() {
    return this.rateService.fetchAll();
  }
}

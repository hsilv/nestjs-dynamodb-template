import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Get Hello' })
  @ApiResponse({ status: 200, description: 'Say hello.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
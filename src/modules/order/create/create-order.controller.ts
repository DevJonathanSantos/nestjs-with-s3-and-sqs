import { Controller, Body, Post, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateOrderService } from './create-order.service';
import { CreateOrderRequestDto } from './dtos/request.dto';
import { CreateOrderResponseDto } from './dtos/response.dto';

@ApiTags('orders')
@Controller('orders')
export class CreateOrderController {
  constructor(private readonly service: CreateOrderService) {}

  @ApiOkResponse({
    description: 'Order has been successfully created.',
    type: CreateOrderResponseDto,
  })
  @Post()
  @UsePipes()
  async create(@Body() request: CreateOrderRequestDto) {
    return await this.service.execute(request);
  }
}

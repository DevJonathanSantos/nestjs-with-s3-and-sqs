import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderRequestDto {
  @ApiProperty({ description: 'Id of the costumer', example: 1 })
  productId: number;

  @ApiProperty({
    description: 'Total amount of tickets available',
    example: 10,
  })
  totalAmount: number;
}

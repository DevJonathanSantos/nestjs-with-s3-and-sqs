import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequestDto {
  @ApiProperty({
    description: 'Description of the product',
    example: 'Porscher 911 GTS',
  })
  description: string;
}

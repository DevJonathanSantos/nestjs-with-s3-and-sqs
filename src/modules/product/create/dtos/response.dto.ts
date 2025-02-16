import { ApiProperty } from '@nestjs/swagger';

export class CreateProductResponseDto {
  @ApiProperty({ example: 'Produto criado com sucesso!' })
  message: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number', example: 5 },
      tenantId: { type: 'number', example: 1 },
      description: { type: 'string', example: 'Porsche 911 GTS' },
      createdAt: { type: 'string', example: '2025-01-31T09:04:55.269Z' },
      updatedAt: { type: 'string', example: '2025-01-31T09:04:55.269Z' },
    },
  })
  product: {
    id: number;
    tenantId: number;
    description: string;
    createdAt: string;
    updatedAt: string;
  };

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 5 },
        productId: { type: 'number', example: 5 },
        imagePath: {
          type: 'string',
          example:
            'https://conrado-prizedraws.s3.us-east-1.amazonaws.com/images/1738314295274_3082_encarregado.png',
        },
        createdAt: { type: 'string', example: '2025-01-31T09:04:56.897Z' },
      },
    },
  })
  images: Array<{
    id: number;
    productId: number;
    imagePath: string;
    createdAt: string;
  }>;
}

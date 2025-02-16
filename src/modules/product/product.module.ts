import { Module } from '@nestjs/common';

import { S3Provider } from 'src/shared/providers/aws/s3/s3-provider';

import { CreateProductController } from './create/create-product.controller';
import { CreateProductService } from './create/create-product.service';

@Module({
  imports: [],
  controllers: [CreateProductController],
  providers: [S3Provider, CreateProductService],
})
export class ProductModule {}

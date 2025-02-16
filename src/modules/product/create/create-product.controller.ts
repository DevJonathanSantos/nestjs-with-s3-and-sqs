import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateProductRequestDto } from './dtos/request.dto';
import { CreateProductService } from './create-product.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('products')
@Controller('products')
export class CreateProductController {
  constructor(private readonly service: CreateProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an product ' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 5))
  @ApiBody({
    description: 'Product data with images',
    schema: {
      type: 'object',
      properties: {
        description: { type: 'string', example: 'Porsche 911 GTS' },
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The Product has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  createProduct(
    @Body() createProductDto: CreateProductRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.service.execute(createProductDto, files);
  }
}

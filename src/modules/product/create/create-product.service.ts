import { Injectable } from '@nestjs/common';
import { CreateProductRequestDto } from './dtos/request.dto';
import { S3Provider } from 'src/shared/providers/aws/s3/s3-provider';
import * as mime from 'mime-types';

@Injectable()
export class CreateProductService {
  constructor(private readonly s3Provider: S3Provider) {}

  async execute(
    request: CreateProductRequestDto,
    files: Express.Multer.File[],
  ) {
    const { description } = request;

    const bucketName = 'conrado-prizedraws'; //process.env.AWS_S3_BUCKET_NAME;
    const region = process.env.AWS_REGION || 'us-east-1';
    const uploadedImages = [];

    const uploadPromises = files.map(async (file) => {
      const { originalname, buffer } = file;
      const mimeType = mime.lookup(originalname) || 'application/octet-stream';
      const timestamp = Date.now();
      const randomSuffix = Math.floor(Math.random() * 10000);
      const key = `images/${timestamp}_${randomSuffix}_${originalname}`;

      await this.s3Provider.uploadFile(bucketName, key, buffer, mimeType);

      const imagePath = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

      return imagePath;
    });

    const uploadedImagesRecords = await Promise.all(uploadPromises);
    uploadedImages.push(...uploadedImagesRecords);

    return {
      message: 'Award created successfully!',
      product: description,
      images: uploadedImages,
    };
  }
}

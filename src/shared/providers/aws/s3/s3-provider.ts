import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Provider {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    console.log(
      JSON.stringify({
        region: this.configService.get<string>('AWS_REGION'),
        credentials: {
          accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
          secretAccessKey: this.configService.get<string>(
            'AWS_SECRET_ACCESS_KEY',
          ),
        },
      }),
    );
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(
    bucket: string,
    key: string,
    body: Buffer | Uint8Array | Blob | string,
    mimeType: string,
  ) {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: mimeType,
    });

    try {
      const data = await this.s3.send(command);
      return data;
    } catch (err) {
      console.error('Error uploading file:', err);
      throw err;
    }
  }

  async getFile(bucket: string, key: string) {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    try {
      const data = await this.s3.send(command);
      return data;
    } catch (err) {
      console.error('Error fetching file:', err);
      throw err;
    }
  }

  async deleteFile(bucket: string, key: string) {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    try {
      const data = await this.s3.send(command);
      return data;
    } catch (err) {
      console.error('Error deleting file:', err);
      throw err;
    }
  }
}

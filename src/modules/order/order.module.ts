import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';

import { SQSProvider } from 'src/shared/providers/aws/sqs/sqs-provider';

import { CreateOrderController } from './create/create-order.controller';
import { CreateOrderService } from './create/create-order.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { SQSClient } from '@aws-sdk/client-sqs';
import { ProcessOrderService } from './process/process-order.service';

@Module({
  imports: [
    SqsModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const accessKeyId = configService.get<string>('AWS_ACCESS_KEY_ID');
        const secretAccessKey = configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        );

        return {
          consumers: [
            {
              name: configService.get<string>('CREATE_ORDER_QUEUE_NAME'), // name of the queue
              queueUrl: configService.get<string>('CREATE_ORDER_QUEUE_URL'), // url of the queue
              region: configService.get<string>('AWS_REGION'), // using the same region for the producer
              batchSize: 5, // number of messages to receive at once
              // visibilityTimeout:10,
              // waitTimeSeconds:300,
              terminateGracefully: true, // gracefully shutdown when SIGINT/SIGTERM is received
              sqs: new SQSClient({
                region: configService.get<string>('AWS_REGION'),
                credentials: {
                  accessKeyId: accessKeyId,
                  secretAccessKey: secretAccessKey,
                },
              }),
            },
          ],
          producers: [],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [CreateOrderController],
  providers: [SQSProvider, CreateOrderService, ProcessOrderService],
})
export class OrderModule {}

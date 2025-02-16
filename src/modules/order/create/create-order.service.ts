import { Injectable } from '@nestjs/common';
import { SQSProvider } from 'src/shared/providers/aws/sqs/sqs-provider';
import { CreateOrderRequestDto } from './dtos/request.dto';

@Injectable()
export class CreateOrderService {
  private createOrderQueueUrl = process.env.CREATE_ORDER_QUEUE_URL;

  constructor(private readonly sqsProvider: SQSProvider) {}

  async execute(request: CreateOrderRequestDto) {
    await this.sqsProvider.sendMessage(
      this.createOrderQueueUrl,
      JSON.stringify(request),
    );

    await this.sqsProvider.sendMessage(
      this.createOrderQueueUrl,
      JSON.stringify(request),
    );
  }
}

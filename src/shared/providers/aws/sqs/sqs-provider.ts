import { Injectable } from '@nestjs/common';
import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SQSProvider {
  private sqs: SQSClient;

  constructor(private readonly configService: ConfigService) {
    this.sqs = new SQSClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async sendMessage(queueUrl: string, messageBody: string) {
    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: messageBody,
    });

    try {
      const data = await this.sqs.send(command);
      return data;
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  }

  async receiveMessages(queueUrl: string, maxNumberOfMessages: number = 1) {
    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: maxNumberOfMessages,
    });

    try {
      const data = await this.sqs.send(command);
      return data;
    } catch (err) {
      console.error('Error receiving messages:', err);
      throw err;
    }
  }

  async deleteMessage(queueUrl: string, receiptHandle: string) {
    const command = new DeleteMessageCommand({
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    });

    try {
      const data = await this.sqs.send(command);
      return data;
    } catch (err) {
      console.error('Error deleting message:', err);
      throw err;
    }
  }
}

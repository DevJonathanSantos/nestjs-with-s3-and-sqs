import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class ProcessOrderService {
  constructor() {}

  @SqsMessageHandler(/** name: */ `CreateOrderTest`, /** batch: */ false)
  async handleMessage(message: any) {
    //A default behavior of AWS messaging services is, in some cases, to send more than one message to ensure content delivery!
    //Work with a strategy to ensure the resilience of your flow!!!
    console.log('Consumer  Start ....:');
    console.log(
      'Message:',
      JSON.stringify({
        messageId: message.MessageId,
        body: JSON.parse(message.Body),
      }),
    );

    try {
      //Todo
    } catch (error) {
      console.log('consumer error', JSON.stringify(error));
    }
  }
}

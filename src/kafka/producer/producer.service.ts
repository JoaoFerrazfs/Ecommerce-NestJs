import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

  async sendMessage(topic: string, message: object) {
    const messageString = JSON.stringify(message);
    await this.kafkaClient.emit(topic,  messageString)
  }
}

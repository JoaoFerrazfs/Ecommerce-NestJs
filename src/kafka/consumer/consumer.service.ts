import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private readonly logger = new Logger(ConsumerService.name);
  private consumer: Consumer;

  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'],
    });

    this.consumer = kafka.consumer({ groupId: 'my-consumer-group' });

    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'contents_creation', fromBeginning: true });

    this.logger.log('Consumidor Kafka conectado e inscrito no tópico');

    await this.consumeAllMessages();
  }

  async consumeAllMessages(): Promise<void> {
    this.logger.log('Iniciando o consumo de todas as mensagens');

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageValue = message.value?.toString();
        if (messageValue) {
          this.logger.log('                                           ')
          this.logger.log(`Mensagem recebida: ${messageValue}`);
          await this.processMessage(messageValue);
        }
      },
    });
  }

  private async processMessage(message: string): Promise<void> {
    try {
      // Simulando processamento (pode ser algo mais complexo)
      this.logger.log(`Processando mensagem: ${message}`);
    } catch (error) {
      this.logger.error('Erro ao processar mensagem', error);
    }
  }
}
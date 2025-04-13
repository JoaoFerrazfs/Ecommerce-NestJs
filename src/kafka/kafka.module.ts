import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer/producer.service';
import { ConsumerService } from './consumer/consumer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'my-consumer-group',
          },
        },
      },
    ]),
  ],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService],
})
export class KafkaModule {}

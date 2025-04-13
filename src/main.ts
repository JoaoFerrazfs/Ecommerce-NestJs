import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { create } from 'express-handlebars';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { COMPARISON } from './views/helpers/comparison';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ContentsModule } from './contents/contents.module';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';
import { ProductModule } from './products/product.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Static files server
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // HandleBars
  const hbs = create({
    extname: 'hbs',
    partialsDir: join(__dirname, '..', 'src', 'views', 'partials'),
    defaultLayout: join(__dirname, '..', 'src', 'views', 'layouts', 'main'),
    layoutsDir: join(__dirname, '..', 'src', 'views', 'layouts'),
    helpers: COMPARISON,
  });

  app.setBaseViewsDir(join(__dirname, '..', 'src'));
  app.engine('hbs', hbs.engine);
  app.setViewEngine('hbs');

  // Swagguer
  const config = new DocumentBuilder()
    .setTitle('Ecommerce NestJS')
    .setVersion('1.0')
    .addServer('http://localhost:3000/')
    .build();

  const documentFactory = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, config, {
      include: [ContentsModule, ProductModule],
    });

  SwaggerModule.setup('oas', app, documentFactory, {
    jsonDocumentUrl: 'OAS/json',
    customSiteTitle: 'Ecommerce Nest JS',
    yamlDocumentUrl: 'OAS/yaml',
  });

  // Validations
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new NotFoundExceptionFilter());

  // Base config
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

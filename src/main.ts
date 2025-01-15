import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { COMPARISON } from './views/helpers/comparison';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { BannerController } from './contents/controllers/api/banners.controller';
import { ContentsController } from './contents/controllers/api/contents.controller';
import { ContentsModule } from './contents/contents.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Static files server
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // HandleBars
  app.setBaseViewsDir(join(__dirname, '..', 'src'));
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'src', 'views', 'partials'),
      defaultLayout: join(__dirname, '..', 'src', 'views', 'layouts', 'main'),
      layoutsDir: join(__dirname, '..', 'src', 'views', 'layouts'),
      helpers: COMPARISON,
    }),
  );
  app.setViewEngine('hbs');

  // Swagguer
  const config = new DocumentBuilder()
    .setTitle('Ecommerce NestJS')
    .setVersion('1.0')
    .addServer('http://localhost:3000/')
    .setBasePath('/api')
    .build();

  const documentFactory = ():OpenAPIObject => SwaggerModule.createDocument(app, config, {include: [ContentsModule]});

  SwaggerModule.setup('oas', app, documentFactory, {
    jsonDocumentUrl: 'OAS/json',
    customSiteTitle: 'Ecommerce Nest JS',
    yamlDocumentUrl: 'OAS/yaml',
  });

  // Validations
  app.useGlobalPipes(new ValidationPipe());

  // Base config
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

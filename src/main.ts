import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src'));
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'src', 'views', 'partials'),
      defaultLayout: join(__dirname, '..', 'src', 'views', 'layouts', 'main'),
      layoutsDir: join(__dirname, '..', 'src', 'views', 'layouts'),
    }),
  );

  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<Env, true>>(ConfigService);

  const port = configService.get('PORT', { infer: true });

  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log('🚀 Server is running...');
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });

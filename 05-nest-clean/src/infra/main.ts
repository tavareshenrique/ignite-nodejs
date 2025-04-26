import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env = app.get(EnvService);

  const port = env.get('PORT');

  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log('🚀 Server is running...');
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  console.log(configService.get('ALLOWED_DOMAINS'))

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: async (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        return callback(null, true);
      }


      try {
        const allowedDomains = [
          'http://localhost:5174',
          "https://heunets-frontend.vercel.app",
          "http://heunets-frontend.vercel.app"
          process.env.FRONTEND_URL,
          ...(configService.get('ALLOWED_DOMAINS') || '').split(',').filter(Boolean)
        ];

        if (allowedDomains.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      } catch (error) {
        callback(error);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-API-KEY, x-user-role, x-user-id',
    exposedHeaders: 'Content-Range, X-Content-Range',
    maxAge: 3600
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log('App started on port', process.env.PORT ?? 3000);


}
bootstrap();

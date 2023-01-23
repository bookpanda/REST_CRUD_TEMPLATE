import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

const PORT = 4201;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(PORT);
  console.log(
    `Application is running on port ${PORT}
Localhost endpoint => http://localhost:${PORT}
Apollo Studio => https://studio.apollographql.com/sandbox/explorer`
  );
}

bootstrap();

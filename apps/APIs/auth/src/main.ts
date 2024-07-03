import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { RbacGuard as rbac } from "@nizar-repo/route-protector";

async function bootstrap() {
  console.log(rbac);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.setGlobalPrefix("api/v1/auth");
  await app.listen(process.env.PORT);
}
bootstrap();

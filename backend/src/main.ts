import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { writeFileSync } from "fs";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3000;

  app.setGlobalPrefix("api/v1");

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle("Personal Notes API")
    .setDescription("API para gestión de notas personales con autenticación JWT")
    .setVersion("1.0")
    .addBearerAuth() // Agrega soporte para JWT en Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document); // Swagger estará disponible en /api

  //CORS
  app.enableCors({
    origin: "*",
    credentials: true,
  });

  //Registro del filtro global para errores tipo JSON Problem
  app.useGlobalFilters(new HttpExceptionFilter());

  //Guardar archivo JSON localmente
  const outputPath = join(process.cwd(), "openapi.json");
  writeFileSync(outputPath, JSON.stringify(document, null, 2));
  console.log(`OpenAPI JSON generado en: ${outputPath}`);

  await app.listen(port);
  console.log(`App running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api`);
}
bootstrap();

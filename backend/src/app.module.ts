import { Module, MiddlewareConsumer, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import databaseConfig from "./config/database.config";
import { NotesModule } from "./modules/notes/notes.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { HeaderSanitizerMiddleware } from "./common/middleware/header-sanitizer.middleware";
import { UuidValidationMiddleware } from "./common/middleware/uuid-validation.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: "mysql",
        host: config.get<string>("database.host"),
        port: config.get<number>("database.port"),
        username: config.get<string>("database.username"),
        password: config.get<string>("database.password"),
        database: config.get<string>("database.database"),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    NotesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Globales
    consumer.apply(LoggerMiddleware, HeaderSanitizerMiddleware).forRoutes("*");

    // Middleware de validación de UUID solo para rutas con :id en notes
    consumer
      .apply(UuidValidationMiddleware)
      .forRoutes(
        { path: "notes/:id", method: RequestMethod.GET },
        { path: "notes/:id", method: RequestMethod.PATCH },
        { path: "notes/:id", method: RequestMethod.DELETE },
      );
  }
}

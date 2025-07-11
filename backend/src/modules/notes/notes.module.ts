import { Module } from "@nestjs/common";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "./entities/note.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService], // opcional, por si lo usas en otros módulos
})
export class NotesModule {}

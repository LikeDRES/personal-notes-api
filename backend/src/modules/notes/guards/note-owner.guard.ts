import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { NotesService } from "../notes.service";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { User } from "../../../users/entities/user.entity";

@Injectable()
export class NoteOwnerGuard implements CanActivate {
  constructor(
    private readonly notesService: NotesService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;
    const noteId = request.params.id;

    if (!noteId) {
      throw new NotFoundException("Note ID not provided in request");
    }

    // Este método lanza ForbiddenException si el usuario no es dueño
    await this.notesService.findOne(noteId, user);

    return true;
  }
}

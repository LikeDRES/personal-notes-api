import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "./entities/note.entity";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const note = this.noteRepository.create({
      ...createNoteDto,
      user,
    });
    return this.noteRepository.save(note);
  }

  async findAll(user: User): Promise<Note[]> {
    return this.noteRepository.find({
      where: { user: { id: user.id } },
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: string, user: User): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    if (note.user.id !== user.id) {
      throw new ForbiddenException("You do not own this note");
    }

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, user: User): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    if (note.user.id !== user.id) {
      throw new ForbiddenException("You do not own this note");
    }

    const updated = this.noteRepository.merge(note, updateNoteDto);
    return this.noteRepository.save(updated);
  }

  async remove(id: string, user: User): Promise<void> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    if (note.user.id !== user.id) {
      throw new ForbiddenException("You do not own this note");
    }

    await this.noteRepository.remove(note);
  }
}

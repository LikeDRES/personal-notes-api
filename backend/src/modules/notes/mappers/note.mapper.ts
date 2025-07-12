import { NoteResponseDto } from "../dto/note-response.dto";
import { Note } from "../entities/note.entity";

export function toNoteResponseDto(note: Note): NoteResponseDto {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };
}

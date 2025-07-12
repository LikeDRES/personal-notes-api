import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { NoteResponseDto } from "./dto/note-response.dto";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { toNoteResponseDto } from "./mappers/note.mapper";
import { User } from "../../users/entities/user.entity";
import { Note } from "./entities/note.entity";
import { NoteOwnerGuard } from "./guards/note-owner.guard";

@ApiTags("Notes")
@ApiBearerAuth()
@Controller("notes")
@UseGuards(AuthGuard("jwt"))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new note" })
  @ApiResponse({ status: 201, type: NoteResponseDto })
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @CurrentUser() user: User,
  ): Promise<NoteResponseDto> {
    console.log("🟢 Entró al controlador POST /notes");
    console.log("Usuario:", user);
    return this.notesService.create(createNoteDto, user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all notes of the current user" })
  @ApiResponse({ status: 200, type: [NoteResponseDto] })
  async findAll(@CurrentUser() user: User): Promise<NoteResponseDto[]> {
    const notes: Note[] = await this.notesService.findAll(user);
    return notes.map((note: Note) => toNoteResponseDto(note));
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get a specific note by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, type: NoteResponseDto })
  async findOne(@Param("id") id: string, @CurrentUser() user: User): Promise<NoteResponseDto> {
    const note: Note = await this.notesService.findOne(id, user);
    return toNoteResponseDto(note);
  }

  @Patch(":id")
  @UseGuards(NoteOwnerGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a note by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, type: NoteResponseDto })
  async update(
    @Param("id") id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @CurrentUser() user: User,
  ): Promise<NoteResponseDto> {
    const note: Note = await this.notesService.update(id, updateNoteDto, user);
    return toNoteResponseDto(note);
  }

  @Delete(":id")
  @UseGuards(NoteOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a note by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 204 })
  async remove(@Param("id") id: string, @CurrentUser() user: User): Promise<void> {
    await this.notesService.remove(id, user);
  }
}

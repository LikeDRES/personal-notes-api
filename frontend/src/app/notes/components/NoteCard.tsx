'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Note {
    id: string;
    title: string;
    content: string;
}

interface NoteCardProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
    return (
        <Card className="rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <CardContent className="p-6 space-y-4">
                <Link href={`/notes/${note.id}`}>
                    <h2 className="text-lg font-semibold text-gray-800 hover:underline line-clamp-2">
                        {note.title}
                    </h2>
                </Link>

                <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-4">
                    {note.content}
                </p>

                <div className="flex justify-end gap-2 pt-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={() => onEdit(note)}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-xl"
                        onClick={() => onDelete(note.id)}
                    >
                        Eliminar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
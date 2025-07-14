'use client';

import NoteCard from "./NoteCard";

interface Note {
    id: string;
    title: string;
    content: string;
}

interface NoteListProps {
    notes: Note[];
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
}

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
    if (notes.length === 0) {
        return (
            <div className="text-center py-24">
                <p className="text-muted-foreground text-lg">Aún no tienes notas creadas.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
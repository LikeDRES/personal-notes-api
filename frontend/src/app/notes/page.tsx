'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface Note {
    id: string;
    title: string;
    content: string;
}

export default function NotesPage() {
    const router = useRouter();
    const [notes, setNotes] = useState<Note[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [userName, setUserName] = useState("");

    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const fetchNotes = async () => {
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notes`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    router.push("/login");
                    return;
                }
                throw new Error("Error al cargar notas");
            }

            const data = await res.json();
            setNotes(data);
        } catch {
            setError("No se pudieron cargar las notas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
        const name = localStorage.getItem("userName");
        if (name) setUserName(name);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        router.push("/login");
    };

    const handleCreate = async () => {
        if (!title || !content || !token) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) throw new Error("Error al crear nota");

            setTitle("");
            setContent("");
            fetchNotes();
        } catch {
            setError("No se pudo crear la nota");
        }
    };

    const handleDelete = async (id: string) => {
        if (!token) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notes/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Error al eliminar nota");

            fetchNotes();
        } catch {
            setError("No se pudo eliminar la nota");
        }
    };

    const handleUpdate = async () => {
        if (!editingNoteId || !title || !content || !token) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notes/${editingNoteId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) throw new Error("Error al actualizar nota");

            setEditingNoteId(null);
            setTitle("");
            setContent("");
            fetchNotes();
        } catch {
            setError("No se pudo actualizar la nota");
        }
    };

    const startEditing = (note: Note) => {
        setEditingNoteId(note.id);
        setTitle(note.title);
        setContent(note.content);
    };

    const cancelEditing = () => {
        setEditingNoteId(null);
        setTitle("");
        setContent("");
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 py-10 space-y-8">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-900 text-balance flex items-center gap-2">
                        Tus notas
                        {userName && <Badge>{userName}</Badge>}
                    </h1>
                    <Button variant="destructive" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </CardHeader>

                <CardContent>
                    {loading && <p className="text-sm text-muted-foreground">Cargando notas...</p>}
                    {error && (
                        <div className="text-sm text-red-600 border border-red-300 bg-red-50 p-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <NoteForm
                        title={title}
                        content={content}
                        onChangeTitle={setTitle}
                        onChangeContent={setContent}
                        onSubmit={editingNoteId ? handleUpdate : handleCreate}
                        isEditing={!!editingNoteId}
                        onCancelEdit={cancelEditing}
                    />
                </CardContent>
            </Card>

            <NoteList notes={notes} onEdit={startEditing} onDelete={handleDelete} />
        </div>
    );
}
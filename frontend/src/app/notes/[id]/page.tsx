'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NoteDetailPage() {
    const router = useRouter();
    const params = useParams();
    const [note, setNote] = useState<{ title: string; content: string } | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            router.push("/login");
            return;
        }

        const fetchNote = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/notes/${params.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        router.push("/login");
                        return;
                    }
                    throw new Error("Error al cargar la nota");
                }

                const data = await res.json();
                setNote(data);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar la nota.");
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [params.id, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-muted-foreground text-lg">
                Cargando nota...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="bg-red-100 text-red-700 p-4 rounded-md border border-red-400 shadow max-w-md text-center">
                    {error}
                </div>
            </div>
        );
    }

    if (!note) return null;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-muted">
            <Card className="w-full max-w-[800px] shadow-xl p-6 bg-background">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-balance text-primary">
                        {note.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-muted-foreground text-base whitespace-pre-line leading-relaxed mb-6">
                        {note.content}
                    </div>
                    <Button variant="link" onClick={() => router.back()} className="px-0 text-sm text-blue-600 hover:underline">
                        ← Volver atrás
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
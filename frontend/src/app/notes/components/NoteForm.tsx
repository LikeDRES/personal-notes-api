'use client';

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface NoteFormProps {
    title: string;
    content: string;
    onChangeTitle: (value: string) => void;
    onChangeContent: (value: string) => void;
    onSubmit: () => void;
    isEditing: boolean;
    onCancelEdit?: () => void;
}

export default function NoteForm({
                                     title,
                                     content,
                                     onChangeTitle,
                                     onChangeContent,
                                     onSubmit,
                                     isEditing,
                                     onCancelEdit,
                                 }: NoteFormProps) {
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");

    useEffect(() => {
        setTitleError(title && title.trim().length < 3 ? "El título debe tener al menos 3 caracteres" : "");
    }, [title]);

    useEffect(() => {
        setContentError(content && content.trim().length < 5 ? "El contenido debe tener al menos 5 caracteres" : "");
    }, [content]);

    const isDisabled = !title || !content || !!titleError || !!contentError;

    return (
        <Card className="rounded-2xl shadow-sm border border-gray-200">
            <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-base">Título</Label>
                    <Input
                        id="title"
                        placeholder="Escribe un título..."
                        value={title}
                        onChange={(e) => onChangeTitle(e.target.value)}
                        className={titleError ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {titleError && <p className="text-sm text-red-600">{titleError}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content" className="text-base">Contenido</Label>
                    <Textarea
                        id="content"
                        placeholder="Escribe el contenido de tu nota..."
                        value={content}
                        onChange={(e) => onChangeContent(e.target.value)}
                        className={contentError ? "border-red-500 focus-visible:ring-red-500" : ""}
                        rows={6}
                    />
                    {contentError && <p className="text-sm text-red-600">{contentError}</p>}
                </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2 pb-6">
                {isEditing && onCancelEdit && (
                    <Button variant="secondary" type="button" onClick={onCancelEdit}>
                        Cancelar
                    </Button>
                )}
                <Button onClick={onSubmit} disabled={isDisabled}>
                    {isEditing ? "Actualizar nota" : "Crear nota"}
                </Button>
            </CardFooter>
        </Card>
    );
}
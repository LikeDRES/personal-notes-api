'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isFormValid = name && email && password && !nameError && !emailError && !passwordError;

    useEffect(() => {
        setNameError(name && name.trim().length < 2 ? "El nombre debe tener al menos 2 caracteres." : "");
    }, [name]);

    useEffect(() => {
        setEmailError(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "El correo electrónico no es válido." : "");
    }, [email]);

    useEffect(() => {
        setPasswordError(password && password.length < 6 ? "La contraseña debe tener al menos 6 caracteres." : "");
    }, [password]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isFormValid) {
            setError("Corrige los errores antes de continuar.");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Registro fallido.");
            }

            router.push("/login");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
            <div className="w-full max-w-[800px]">
                <Card className="p-6 rounded-2xl shadow-lg border border-gray-200">
                    <CardHeader className="text-center space-y-1">
                        <CardTitle className="text-3xl font-semibold">Crear cuenta</CardTitle>
                        <CardDescription>Regístrate para comenzar a usar la aplicación</CardDescription>
                    </CardHeader>

                    <form onSubmit={handleRegister}>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={nameError ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    required
                                />
                                {nameError && <p className="text-sm text-red-600">{nameError}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={emailError ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    required
                                />
                                {emailError && <p className="text-sm text-red-600">{emailError}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={passwordError ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    required
                                />
                                {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                            </div>

                            {error && (
                                <div className="text-center">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4 mt-4">
                            <Button type="submit" className="w-full" disabled={!isFormValid}>
                                Registrarse
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                                ¿Ya tienes una cuenta?{" "}
                                <Link href="/login" className="text-blue-600 hover:underline">
                                    Inicia sesión
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
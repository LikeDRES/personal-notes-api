'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isFormValid = email && password && !emailError && !passwordError;

    useEffect(() => {
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("El correo electrónico no es válido.");
        } else {
            setEmailError("");
        }
    }, [email]);

    useEffect(() => {
        if (password && password.length < 6) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres.");
        } else {
            setPasswordError("");
        }
    }, [password]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isFormValid) {
            setError("Por favor corrige los errores antes de continuar.");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Credenciales incorrectas.");
            }

            const data = await res.json();
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("userName", data.user.name);
            router.push("/notes");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
            <div className="w-full max-w-[800px]">
                <Card className="p-6 rounded-2xl shadow-lg border border-gray-200">
                    <CardHeader className="text-center space-y-1">
                        <CardTitle className="text-3xl font-semibold">Iniciar sesión</CardTitle>
                        <CardDescription>Accede a tu cuenta para continuar</CardDescription>
                    </CardHeader>

                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-6">
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
                            <Button className="w-full" type="submit" disabled={!isFormValid}>
                                Ingresar
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                                ¿No tienes cuenta?{" "}
                                <Link href="/register" className="text-blue-600 hover:underline">
                                    Regístrate
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
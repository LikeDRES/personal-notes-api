import './globals.css';
import "@/app/globals.css"; // Este importa tailwind base
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" className={fontSans.variable}>
        <body
            className={cn(
                'min-h-screen bg-background font-sans antialiased text-foreground flex items-center justify-center'
            )}
        >
        <Toaster richColors position="top-center" closeButton />

        {/* Contenedor principal centrado */}
        <main className="w-full max-w-md p-6 md:p-8 rounded-xl shadow-md bg-white">
            {children}
        </main>
        </body>
        </html>
    );
}
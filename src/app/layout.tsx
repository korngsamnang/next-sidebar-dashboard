import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClientProvider } from "@/providers/query-client-provider";
import { NuqsAdapter } from "nuqs/adapters/react";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata = {
    title: {
        template: "%s",
        default: "SDF Attendance",
    },
    description: "Skills Development Fund (SDF) Attendance System",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning className={GeistSans.className}>
                <QueryClientProvider>
                    <AuthProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                        >
                            <NuqsAdapter>{children}</NuqsAdapter>
                            <Toaster />
                        </ThemeProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}

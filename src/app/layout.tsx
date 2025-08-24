import Footer from "@/components/footer/app.footer";
import Header from "@/components/header/app.header";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                    <Header />
                    <ThemeRegistry>{children}</ThemeRegistry>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    );
}

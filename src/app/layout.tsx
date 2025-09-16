import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "./lib/next.auth.wrapper";
import { ToastProvider } from "@/utils/toast";
import { TrackContextProvider } from "./lib/context";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Duong Layout",
    description: "dasndjasns",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <ToastProvider>
                        <NextAuthWrapper>
                            <TrackContextProvider>
                                {children}
                            </TrackContextProvider>
                        </NextAuthWrapper>
                    </ToastProvider>
                </ThemeRegistry>
            </body>
        </html>
    );
}

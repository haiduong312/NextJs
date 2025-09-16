import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "./lib/next.auth.wrapper";
import { ToastProvider } from "@/utils/toast";
import { TrackContextProvider } from "./lib/context";
import { Metadata } from "next";
import NProgressWrapper from "./lib/nprogress.wrapper";

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
                    <NProgressWrapper>
                        <NextAuthWrapper>
                            <ToastProvider>
                                <TrackContextProvider>
                                    {children}
                                </TrackContextProvider>
                            </ToastProvider>
                        </NextAuthWrapper>
                    </NProgressWrapper>
                </ThemeRegistry>
            </body>
        </html>
    );
}

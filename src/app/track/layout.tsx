import Footer from "@/components/footer/app.footer";
import Header from "@/components/header/app.header";
import Script from "next/script";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "My Blog",
    description: "...",
};
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

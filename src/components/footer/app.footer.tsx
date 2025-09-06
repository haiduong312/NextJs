"use client";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Container } from "@mui/material";
import { useHasMounted } from "@/utils/customeHook";
import "@/app/styles/footer.css";
import { useBearStore } from "@/app/lib/store";
const Footer = () => {
    const hasMounted = useHasMounted();
    if (!hasMounted) return <></>;
    return (
        <div style={{ marginTop: 50 }}>
            <AppBar
                position="fixed"
                color="primary"
                sx={{
                    top: "auto",
                    bottom: 0,
                    background: "#f2f2f2",
                }}
            >
                <Container
                    sx={{
                        display: "flex",
                        gap: 10,
                    }}
                >
                    <AudioPlayer
                        layout="horizontal-reverse"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                        volume={0.5}
                        style={{ boxShadow: "none", background: "#f2f2f2" }}
                    />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            justifyContent: "center",
                            minWidth: 100,
                        }}
                    >
                        <div style={{ color: "rgb(140 138 138)" }}>Eric</div>
                        <div style={{ color: "black" }}>Who am I?</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    );
};
export default Footer;

"use client";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Fab from "@mui/material/Fab";
import { Container } from "@mui/material";
import { useHasMounted } from "@/utils/customeHook";
const Footer = () => {
    const hasMounted = useHasMounted();
    if (!hasMounted) return <></>;
    return (
        <div>
            <AppBar
                position="fixed"
                color="primary"
                sx={{
                    top: "auto",
                    bottom: 0,
                    background: "#f2f2f2",
                }}
            >
                <Container sx={{ display: "flex", gap: 10 }}>
                    <AudioPlayer
                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
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

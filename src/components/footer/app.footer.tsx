"use client";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import AppBar from "@mui/material/AppBar";
import { Container } from "@mui/material";
import { useHasMounted } from "@/utils/customeHook";
import "@/app/styles/footer.css";
import { useRef } from "react";
import { useTrackContext } from "@/app/lib/context";
const Footer = () => {
    const { currentTrack, setCurrentTrack } =
        useTrackContext() as ITrackContext;
    const playRef = useRef(null);
    const hasMounted = useHasMounted();
    if (!hasMounted) return <></>;

    if (currentTrack?.isPlaying) {
        //@ts-ignore
        playRef?.current?.audio?.current?.play();
    } else {
        //@ts-ignore
        playRef?.current?.audio?.current?.pause();
    }

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
                    {currentTrack.trackUrl ? (
                        <AudioPlayer
                            ref={playRef}
                            layout="horizontal-reverse"
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                            volume={0.5}
                            style={{ boxShadow: "none", background: "#f2f2f2" }}
                            autoPlay={true}
                            onPlay={() => {
                                setCurrentTrack({
                                    ...currentTrack,
                                    isPlaying: true,
                                });
                            }}
                            onPause={() => {
                                setCurrentTrack({
                                    ...currentTrack,
                                    isPlaying: false,
                                });
                            }}
                        />
                    ) : (
                        <></>
                    )}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            justifyContent: "center",

                            minWidth: 100,
                        }}
                    >
                        <div
                            style={{
                                color: "rgb(140 138 138)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "200px",
                            }}
                        >
                            {currentTrack.description}
                        </div>
                        <div
                            style={{
                                color: "black",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "200px",
                            }}
                        >
                            {currentTrack.title}
                        </div>
                    </div>
                </Container>
            </AppBar>
        </div>
    );
};
export default Footer;

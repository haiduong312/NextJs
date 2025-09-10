"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useWaveSurfer } from "@/utils/customeHook";
import { WaveSurferOptions } from "wavesurfer.js";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./WaveTrack.scss";
import { Tooltip } from "@mui/material";
import { useTrackContext } from "@/app/lib/context";
import { fetchDefaultImage } from "@/utils/api";
import CommentTrack from "./comment.track";

interface IProps {
    track: ITrackTop | null;
    comment: ITrackComment[];
}
const WaveTrack = ({ track, comment }: IProps) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const fileName = searchParams.get("audio");
    const { currentTrack, setCurrentTrack } =
        useTrackContext() as ITrackContext;
    const containerRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<string>("0:00");
    const [duration, setDuration] = useState<string>("0:00");
    const hoverRef = useRef<HTMLDivElement>(null);

    const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
        let gradient, progressGradient;
        if (typeof window !== "undefined") {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
            gradient.addColorStop(0, "#656666");
            gradient.addColorStop(
                (canvas.height * 0.7) / canvas.height,
                "#656666"
            );
            gradient.addColorStop(
                (canvas.height * 0.7 + 1) / canvas.height,
                "#ffffff"
            );
            gradient.addColorStop(
                (canvas.height * 0.7 + 2) / canvas.height,
                "#ffffff"
            );
            gradient.addColorStop(
                (canvas.height * 0.7 + 3) / canvas.height,
                "#B1B1B1"
            );
            gradient.addColorStop(1, "#B1B1B1");

            progressGradient = ctx.createLinearGradient(
                0,
                0,
                0,
                canvas.height * 1.35
            );
            progressGradient.addColorStop(0, "#EE772F");
            progressGradient.addColorStop(
                (canvas.height * 0.7) / canvas.height,
                "#EB4926"
            );
            progressGradient.addColorStop(
                (canvas.height * 0.7 + 1) / canvas.height,
                "#ffffff"
            );
            progressGradient.addColorStop(
                (canvas.height * 0.7 + 2) / canvas.height,
                "#ffffff"
            );
            progressGradient.addColorStop(
                (canvas.height * 0.7 + 3) / canvas.height,
                "#F6B094"
            );
            progressGradient.addColorStop(1, "#F6B094");
        }
        return {
            waveColor: gradient,
            progressColor: progressGradient,
            barWidth: 3,
            height: 100,
            url: `/api?audio=${fileName}`,
        };
    }, []);

    const wavesurfer = useWaveSurfer(containerRef, optionsMemo);

    useEffect(() => {
        if (!wavesurfer) return;
        setIsPlaying(false);

        const hover = hoverRef.current;
        const waveform = containerRef.current;
        if (waveform && hover) {
            waveform.addEventListener(
                "pointermove",
                (e) => (hover.style.width = `${e.offsetX}px`)
            );
        }
        const subscriptions = [
            wavesurfer.on("play", () => setIsPlaying(true)),
            wavesurfer.on("pause", () => setIsPlaying(false)),
            wavesurfer.on("decode", (duration) =>
                setDuration(formatTime(duration))
            ),
            wavesurfer.on("timeupdate", (currentTime) =>
                setTime(formatTime(currentTime))
            ),
            wavesurfer.on("click", () => {
                wavesurfer.play();
            }),
        ];
        return () => {
            subscriptions.forEach((unsub) => unsub());
        };
    }, [wavesurfer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secondsRemainder = Math.round(seconds) % 60;
        const paddedSeconds = `0${secondsRemainder}`.slice(-2);
        return `${minutes}:${paddedSeconds}`;
    };

    const onPlayPause = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.playPause();
            setIsPlaying(wavesurfer?.isPlaying());
        }
    }, [wavesurfer]);
    const arrComments = comment;
    const calLeft = (moment: number) => {
        const hardCodeDuration = 199;
        const percent = (moment / hardCodeDuration) * 100;
        return `${percent}%`;
    };
    useEffect(() => {
        if (wavesurfer && currentTrack._id === track?._id) {
            currentTrack.isPlaying ? wavesurfer.play() : wavesurfer.pause();
        }
    }, [currentTrack]);
    return (
        <div>
            <div
                style={{
                    background: "linear-gradient(to right, #f1f2b5, #135058)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "30px",
                    color: "#fff",
                    marginTop: 20,
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}
            >
                <div
                    className="left"
                    style={{
                        width: "70%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 120,
                    }}
                >
                    {/* Control */}
                    <div
                        className="control"
                        style={{
                            display: "flex",
                            gap: "12px",
                        }}
                    >
                        <button
                            onClick={() => {
                                onPlayPause();
                                if (track && wavesurfer) {
                                    setCurrentTrack({
                                        ...track,
                                        isPlaying: wavesurfer?.isPlaying(),
                                    });
                                }
                            }}
                            style={{
                                background:
                                    "linear-gradient(135deg, #2ecc71, #27ae60)",
                                border: "none",
                                borderRadius: "50%",
                                width: "60px",
                                height: "60px",
                                color: "#fff",
                                fontSize: "18px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                boxShadow: "0 3px 8px rgba(0,0,0,0.4)",
                                transition: "all 0.2s ease",
                                display: "flex", // 👈 thêm
                                alignItems: "center", // 👈 căn giữa dọc
                                justifyContent: "center", // 👈 căn giữa ngang
                                padding: 0,
                            }}
                        >
                            {isPlaying ? (
                                <PauseIcon
                                    style={{ width: "40px", height: "40px" }}
                                />
                            ) : (
                                <PlayArrowIcon
                                    style={{ width: "40px", height: "40px" }}
                                />
                            )}
                        </button>
                        <div className="info">
                            <h2
                                style={{
                                    fontSize: "30px",
                                    margin: "0",
                                    fontWeight: "700",
                                    color: "#fff",
                                    maxWidth: "500px",
                                    wordWrap: "break-word",
                                    overflowWrap: "break-word",
                                    whiteSpace: "normal",
                                    background: "black",
                                    display: "block", // nền chỉ ôm chữ
                                    padding: "4px 8px", // cho đẹp hơn
                                }}
                            >
                                {track?.title}
                            </h2>
                            <p
                                style={{
                                    fontSize: "20px",
                                    margin: "0", // bỏ khoảng cách
                                    color: "rgb(152, 112, 122)",
                                    background: "black",
                                    display: "inline-block", // nền chỉ ôm chữ author
                                    padding: "2px 8px",
                                }}
                            >
                                {track?.description}
                            </p>
                        </div>
                    </div>

                    {/* Waveform */}
                    <div ref={containerRef} className="waveform">
                        <div className="time">{time}</div>
                        <div className="duration">{duration}</div>
                        <div className="hover" ref={hoverRef}></div>
                        <div
                            className="comments"
                            style={{ position: "relative" }}
                        >
                            {arrComments.map((item, index) => {
                                return (
                                    <Tooltip
                                        arrow
                                        title={item.content}
                                        key={item._id}
                                    >
                                        <img
                                            onPointerMove={(e) => {
                                                const hover = hoverRef.current!;
                                                hover.style.width = calLeft(
                                                    item.moment + 4
                                                );
                                            }}
                                            key={index}
                                            src={fetchDefaultImage(
                                                item.user.type
                                            )}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                position: "absolute",
                                                zIndex: 3,
                                                top: 72,
                                                left: calLeft(item.moment),
                                            }}
                                        />
                                    </Tooltip>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Avatar */}
                <div className="right">
                    <div
                        style={{
                            background: "#333",
                            width: "300px",
                            height: "300px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: "20px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                            overflow: "hidden",
                        }}
                    >
                        {track ? (
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
                                alt=""
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: 40 }}>
                <CommentTrack comment={comment} track={track} />
            </div>
        </div>
    );
};
export default WaveTrack;

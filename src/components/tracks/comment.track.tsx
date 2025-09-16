import { fetchDefaultImage, sendRequest } from "@/utils/api";
import { Avatar, TextField } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WaveSurfer from "wavesurfer.js";
import { useHasMounted, useWaveSurfer } from "@/utils/customeHook";
import Image from "next/image";
dayjs.extend(relativeTime);
dayjs.locale("vi");
interface IProps {
    track: ITrackTop | null;
    comment: ITrackComment[];
    wavesurfer: WaveSurfer | null;
}
const CommentTrack = ({ track, comment, wavesurfer }: IProps) => {
    const router = useRouter();
    const hasMounted = useHasMounted();
    const [userComment, setUserComment] = useState<string>("");
    const { data } = useSession();
    const handleSubmit = async () => {
        const res = await sendRequest<
            IBackendRes<IModelPaginate<ITrackComment>>
        >({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments`,
            method: "POST",
            body: {
                content: userComment,
                moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
                track: track?._id,
            },
            headers: {
                Authorization: `Bearer ${data?.access_token}`,
            },
        });
        if (res.data && res) {
            setUserComment("");
            router.refresh();
        }
    };
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secondsRemainder = Math.round(seconds) % 60;
        const paddedSeconds = `0${secondsRemainder}`.slice(-2);
        return `${minutes}:${paddedSeconds}`;
    };
    const handleJumpTime = (moment: number) => {
        if (wavesurfer) {
            const duration = wavesurfer.getDuration();
            wavesurfer.seekTo(moment / duration);
            wavesurfer.play();
        }
    };
    return (
        <div>
            {data?.user ? (
                <TextField
                    fullWidth
                    label="Add a comment"
                    variant="standard"
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit();
                        }
                    }}
                />
            ) : (
                <></>
            )}
            <div
                style={{
                    display: "flex",
                    gap: 70,
                    marginTop: 30,
                }}
            >
                <div className="left" style={{ flexBasis: "10%" }}>
                    <Image
                        src={fetchDefaultImage(track?.uploader.type!)}
                        alt="Avatar"
                        width={150}
                        height={150}
                    />
                    <div style={{ textAlign: "center" }}>
                        {track?.uploader.name}
                    </div>
                </div>
                <div className="right" style={{ flex: 1 }}>
                    {comment.map((item, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    justifyContent: "space-between",
                                    marginBottom: 20,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 20,
                                    }}
                                >
                                    <div>
                                        <Avatar
                                            alt=""
                                            src={fetchDefaultImage(
                                                item.user.type
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <p
                                            style={{
                                                margin: 0,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {item?.user?.name ??
                                                item?.user?.username}{" "}
                                            <span
                                                style={{
                                                    color: "#555",
                                                    fontSize: 14,
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    handleJumpTime(item.moment);
                                                }}
                                            >
                                                at {formatTime(item.moment)}
                                            </span>
                                        </p>
                                        <p style={{ margin: 0, color: "#555" }}>
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ color: "#555" }}>
                                    {hasMounted &&
                                        dayjs(item.createdAt).fromNow()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default CommentTrack;

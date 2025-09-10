import { fetchDefaultImage } from "@/utils/api";
import { Avatar, TextField } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { useSession } from "next-auth/react";
dayjs.extend(relativeTime);
dayjs.locale("vi");
interface IProps {
    track: ITrackTop | null;
    comment: ITrackComment[];
}
const CommentTrack = ({ track, comment }: IProps) => {
    const { data } = useSession();

    return (
        <div>
            {data?.user ? (
                <TextField fullWidth label="Add a comment" variant="standard" />
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
                    <img
                        src={fetchDefaultImage(track?.uploader.type!)}
                        alt=""
                        style={{ width: "100%" }}
                    />
                    <div>{track?.uploader.email}</div>
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
                                    <div style={{ marginBottom: 20 }}>
                                        <p
                                            style={{
                                                margin: 0,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {item.user.name}
                                        </p>
                                        <p style={{ margin: 0, color: "#555" }}>
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ color: "#555" }}>
                                    {dayjs(item.createdAt).fromNow()}
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

import { Chip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
interface IProps {
    track: ITrackTop | null;
}
const LikeTrack = ({ track }: IProps) => {
    const router = useRouter();
    const { data } = useSession();
    const [trackLikes, setTrackLikes] = useState<ITrackLike[] | null>(null);
    const fetchData = async () => {
        if (data?.access_token) {
            const res = await sendRequest<
                IBackendRes<IModelPaginate<ITrackLike>>
            >({
                url: "http://localhost:8000/api/v1/likes",
                method: "GET",
                queryParams: {
                    current: 1,
                    pageSize: 100,
                    sort: "-createdAt",
                },
                headers: {
                    Authorization: `Bearer ${data?.access_token}`,
                },
            });
            if (res.data && res) {
                setTrackLikes(res.data.result);
            }
        }
    };
    useEffect(() => {
        fetchData();
    }, [data]);
    const handleLikeTrack = async () => {
        await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
            url: "http://localhost:8000/api/v1/likes",
            method: "POST",
            body: {
                track: track?._id,
                quantity: trackLikes?.some((t) => t._id === track?._id)
                    ? -1
                    : 1,
            },
            headers: {
                Authorization: `Bearer ${data?.access_token}`,
            },
        });
        fetchData(), router.refresh();
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Chip
                icon={<FavoriteIcon />}
                sx={{
                    borderRadius: "4px",
                    height: 40,
                    width: 90,
                    cursor: "pointer",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    },
                }}
                color={
                    trackLikes?.some((t) => t._id === track?._id)
                        ? "error"
                        : "default"
                }
                label="Like"
                onClick={() => handleLikeTrack()}
            />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        color: "#555",
                    }}
                >
                    <PlayArrowIcon /> <span>{track?.countPlay}</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                        color: "#555",
                    }}
                >
                    <FavoriteIcon /> <span>{track?.countLike}</span>
                </div>
            </div>
        </div>
    );
};
export default LikeTrack;

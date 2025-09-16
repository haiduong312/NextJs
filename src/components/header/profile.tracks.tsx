"use client";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import { useTrackContext } from "@/app/lib/context";
import Link from "next/link";
import { convertSlugUrl } from "@/utils/api";

interface IProps {
    data: ITrackTop;
}

const TrackProfile = ({ data }: IProps) => {
    // const setTrack = useTrackStore((state) => state.setCurrentTrack);
    // const currentTrack = useTrackStore((state) => state.currentTrack);
    const { currentTrack, setCurrentTrack } =
        useTrackContext() as ITrackContext;
    const isPlaying = data._id === currentTrack._id && currentTrack.isPlaying;
    const theme = useTheme();
    return (
        <Card
            sx={{
                display: "flex",
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                padding: "10px",
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-3px)",
                },
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
                    <Link
                        href={`/track/${convertSlugUrl(data.title)}-${
                            data._id
                        }.html?audio=${data.trackUrl}`}
                        style={{
                            textDecoration: "none",
                            color: "unset",
                        }}
                    >
                        <Typography
                            component="div"
                            variant="h5"
                            fontWeight="bold"
                            gutterBottom
                        >
                            {data.title}
                        </Typography>
                    </Link>
                    <Typography
                        variant="body2"
                        component="div"
                        sx={{ color: "text.secondary" }}
                    >
                        {data.description}
                    </Typography>
                </CardContent>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                        pb: 2,
                        gap: 1,
                    }}
                >
                    <IconButton aria-label="previous" size="small">
                        {theme.direction === "rtl" ? (
                            <SkipNextIcon />
                        ) : (
                            <SkipPreviousIcon />
                        )}
                    </IconButton>
                    <IconButton
                        aria-label="play/pause"
                        size="large"
                        color="primary"
                        onClick={() =>
                            setCurrentTrack({ ...data, isPlaying: !isPlaying })
                        }
                    >
                        {isPlaying ? (
                            <PauseIcon sx={{ height: 40, width: 40 }} />
                        ) : (
                            <PlayArrowIcon sx={{ height: 40, width: 40 }} />
                        )}
                    </IconButton>
                    <IconButton aria-label="next" size="small">
                        {theme.direction === "rtl" ? (
                            <SkipPreviousIcon />
                        ) : (
                            <SkipNextIcon />
                        )}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{
                    width: 200,
                    objectFit: "contain",
                }}
                image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${data.imgUrl}`}
                alt={data.title}
            />
        </Card>
    );
};
export default TrackProfile;

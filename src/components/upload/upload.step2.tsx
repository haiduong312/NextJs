"use client";
import LinearProgress, {
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useToast } from "@/utils/toast/useToast";
import { useEffect, useState } from "react";
import { Button, ButtonBase, Container, Grid, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
interface IProps {
    openStep1?: boolean;
    setOpenStep1: (v: boolean) => void;
    trackUpload: {
        fileName: string;
        percent: number;
        uploadedTrackName: string;
    };
}
interface INewTrack {
    title: string;
    description: string;
    trackUrl: string;
    imgUrl: string;
    category: string;
}
function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
function LinearWithValueLabel({ trackUpload }: any) {
    const [progress, setProgress] = useState(10);

    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={trackUpload.percent} />
        </Box>
    );
}
const UploadStep2 = ({ openStep1, setOpenStep1, trackUpload }: IProps) => {
    const toast = useToast();
    const [info, setInfo] = useState<INewTrack>({
        title: "",
        description: "",
        trackUrl: "",
        imgUrl: "",
        category: "",
    });
    const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
    const { data } = useSession();
    const handleUploadImage = async (img: any) => {
        const formData = new FormData();
        formData.append("fileUpload", img);

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${data?.access_token}`,
                        target_type: "images",
                    },
                }
            );
            setInfo({
                ...info,
                imgUrl: res.data.data.fileName,
            });
        } catch (error) {
            //@ts-ignore
            toast.error(error.response.data.message);
        }
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
            handleUploadImage(file);
            console.log(file);
        }
    };
    useEffect(() => {
        if (trackUpload && trackUpload.uploadedTrackName) {
            setInfo({
                ...info,
                trackUrl: trackUpload.uploadedTrackName,
            });
        }
    }, [trackUpload]);
    const select = [
        {
            value: "CHILL",
            label: "Chill",
        },
        {
            value: "WORKOUT",
            label: "Workout",
        },
        {
            value: "PARTY",
            label: "Party",
        },
    ];
    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<ITrackTop[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
            method: "POST",
            body: {
                title: info.title,
                description: info.description,
                trackUrl: info.trackUrl,
                imgUrl: info.imgUrl,
                category: info.category,
            },
            headers: {
                Authorization: `Bearer ${data?.access_token}`,
            },
        });
        if (res && res.data) {
            toast.success("Create a new track successfully");
            await sendRequest<IBackendRes<any>>({
                url: "/api/revalidate",
                method: "POST",
                queryParams: {
                    tag: "track-by-profile",
                    secret: "SECRET_STRING",
                },
            });
            setOpenStep1(true);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 50,
                    marginTop: 60,
                }}
            >
                <button
                    style={{
                        width: 40,
                        height: 40,
                        background: "#f0eeee",
                        border: "none",
                        borderRadius: 9999,
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setOpenStep1(true);
                        localStorage.removeItem("track-upload");
                    }}
                >
                    <ArrowBackIcon />
                </button>
                <LinearWithValueLabel trackUpload={trackUpload} />
            </div>

            <Grid
                container
                spacing={2}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 100,
                    marginTop: 30,
                }}
            >
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-start" }, // mobile căn giữa, desktop bên trái
                    }}
                >
                    <ButtonBase
                        component="label"
                        role={undefined}
                        tabIndex={-1} // prevent label from tab focus
                        aria-label="Avatar image"
                        sx={{
                            "&:has(:focus-visible)": {
                                outline: "2px solid",
                                outlineOffset: "2px",
                            },
                        }}
                    >
                        <Box
                            component="img"
                            alt="Upload new avatar"
                            src={avatarSrc || "/assets/photo/upload-step2.svg"}
                            sx={{
                                width: 350,
                                height: 350,
                                borderRadius: 0,
                                border: "1px dashed #dbdbdb",
                                objectFit: "cover",
                            }}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            style={{
                                border: 0,
                                clip: "rect(0 0 0 0)",
                                height: "1px",
                                margin: "-1px",
                                overflow: "hidden",
                                padding: 0,
                                position: "absolute",
                                whiteSpace: "nowrap",
                                width: "1px",
                            }}
                            onChange={handleAvatarChange}
                        />
                    </ButtonBase>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        gap: 20,
                    }}
                >
                    <TextField
                        required
                        label="Track title"
                        value={info.title}
                        onChange={(e) => {
                            setInfo({
                                ...info,
                                title: e.target.value,
                            });
                        }}
                        variant="standard"
                    />
                    <TextField
                        required
                        label="Track link"
                        value={info.trackUrl}
                        onChange={(e) => {
                            setInfo({
                                ...info,
                                trackUrl: e.target.value,
                            });
                        }}
                        variant="standard"
                    />
                    <TextField
                        select
                        label="Genre"
                        helperText="Please select your genre"
                        placeholder="Add or search for genre"
                        variant="standard"
                        value={info.category}
                        onChange={(e) =>
                            setInfo({
                                ...info,
                                category: e.target.value,
                            })
                        }
                    >
                        {select.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        label="Description"
                        variant="standard"
                        placeholder="Tracks with descriptions tend to get more plays and engagements"
                        value={info.description}
                        onChange={(e) => {
                            setInfo({
                                ...info,
                                description: e.target.value,
                            });
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{ width: 40 }}
                        onClick={() => handleSubmit()}
                    >
                        Upload
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};
export default UploadStep2;

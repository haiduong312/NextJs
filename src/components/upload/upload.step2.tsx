"use client";
import LinearProgress, {
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Avatar, ButtonBase, Container, Grid, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
interface IProps {
    openStep1: boolean;
    setOpenStep1: (v: boolean) => void;
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
const UploadStep2 = ({ openStep1, setOpenStep1 }: IProps) => {
    const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
    const [progress, setProgress] = useState(10);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 10 : prevProgress + 10
            );
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
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

    return (
        <Container>
            <LinearProgressWithLabel
                value={progress}
                style={{ marginTop: 60 }}
            />
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
                        <Avatar
                            alt="Upload new avatar"
                            src={avatarSrc || "/assets/photo/upload-step2.svg"}
                            sx={{
                                width: 350,
                                height: 350,
                                borderRadius: 0,
                                border: "1px dashed #dbdbdb",
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
                        defaultValue="Hello World"
                        variant="standard"
                    />
                    <TextField
                        required
                        label="Track link"
                        defaultValue="Hello World"
                        variant="standard"
                    />
                    <TextField
                        required
                        label="Main artist(s)"
                        defaultValue="Hello World"
                        variant="standard"
                    />
                    <TextField
                        select
                        label="Genre"
                        helperText="Please select your genre"
                        variant="standard"
                    >
                        {select.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        label="Tags"
                        defaultValue="Hello World"
                        variant="standard"
                    />
                    <TextField
                        required
                        label="Description"
                        defaultValue="Hello World"
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </Container>
    );
};
export default UploadStep2;

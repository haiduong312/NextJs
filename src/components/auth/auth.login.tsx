"use client";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {
    Button,
    Fab,
    FormControl,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Visibility } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    padding: theme.spacing(3, 4), // top-bottom = 24px, left-right = 32px
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius * 2, // bo góc mềm hơn
    boxShadow: theme.shadows[4], // shadow vừa
}));

export default function AuthLogin() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

    const [errorUsernameMessage, setErrorUserNameMessage] =
        useState<string>("");
    const [errorPasswordMessage, setErrorPasswordMessage] =
        useState<string>("");

    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");

    const handleSubmit = async () => {
        setIsErrorUsername(false);
        setIsErrorPassword(false);
        setErrorUserNameMessage("");
        setErrorPasswordMessage("");
        if (!username) {
            setIsErrorUsername(true);
            setErrorUserNameMessage("Please enter username");
            return;
        }
        if (!password) {
            setIsErrorPassword(true);
            setErrorPasswordMessage("Please enter password");
            return;
        }
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });
        if (res && !res.error) {
            router.push("/");
        } else {
            setOpenAlert(true);
            setAlertMessage(res?.error || "Login failed, please try again");
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleCloseAlert = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") return; // tránh tắt khi click ra ngoài
        setOpenAlert(false);
    };
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                background:
                    "url('https://images.unsplash.com/photo-1562935256-b3a90e747071?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover no-repeat",
                position: "relative",
            }}
        >
            <Fab
                component={Link}
                href="/"
                size="small"
                sx={{
                    position: "absolute",
                    top: 100,
                    left: 40,
                    zIndex: 3,
                    backgroundColor: "white", // màu cam tùy chọn
                    color: "black", // màu icon
                    "&:hover": {
                        color: "rgba(0, 0, 0, 0.6)", // màu khi hover
                    },
                    display: { xs: "none", sm: "flex" },
                }}
            >
                <ArrowBackIcon />
            </Fab>
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.3)", // tối nhẹ
                    backdropFilter: "blur(6px)", // hiệu ứng mờ
                    zIndex: 1,
                }}
            />
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ position: "relative", zIndex: 2 }}
            >
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Item>
                        {/* Title */}
                        <Box sx={{ marginBottom: "16px" }}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                gutterBottom
                                sx={{ marginBottom: "24px" }}
                            >
                                Sign in or create an account
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                By clicking on any of the “Continue” buttons
                                below, you agree to SoundCloud’s{" "}
                                <a href="#">Terms of Use</a> and acknowledge our{" "}
                                <a href="#">Privacy Policy</a>.
                            </Typography>
                        </Box>

                        {/* Social Sign in */}
                        <Box>
                            <Button
                                variant="contained"
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginBottom: "16px",
                                }}
                                onClick={() => signIn("github")}
                            >
                                <GitHubIcon sx={{ marginRight: "7px" }} />
                                Continue with GitHub
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginBottom: "20px",
                                }}
                                onClick={() => signIn("google")}
                            >
                                <GoogleIcon sx={{ marginRight: "7px" }} />
                                Continue with Google
                            </Button>
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{ marginBottom: "12px" }}
                        >
                            Or with email
                        </Typography>

                        {/* Email + Password */}
                        <Box>
                            <FormControl
                                sx={{ width: "100%", marginBottom: "16px" }}
                            >
                                <TextField
                                    required
                                    placeholder="Email"
                                    variant="outlined"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                    error={isErrorUsername}
                                    helperText={errorUsernameMessage}
                                />
                            </FormControl>
                            <FormControl
                                sx={{ width: "100%", marginBottom: "16px" }}
                            >
                                <TextField
                                    required
                                    placeholder="Password"
                                    variant="outlined"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                    error={isErrorPassword}
                                    helperText={errorPasswordMessage}
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        handleClickShowPassword()
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                sx={{
                                    width: "100%",
                                    fontWeight: "bold",
                                }}
                                onClick={() => handleSubmit()}
                            >
                                Continue
                            </Button>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

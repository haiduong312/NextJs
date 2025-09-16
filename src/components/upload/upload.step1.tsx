"use client";
import { FileWithPath, useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "../../app/styles/theme.css";
import { useCallback, useState } from "react";
import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});
interface IProps {
    openStep1: boolean;
    setOpenStep1: (v: boolean) => void;
    setTrackUpload: any;
    trackUpload: any;
}
const UploadStep1 = ({
    openStep1,
    setOpenStep1,
    setTrackUpload,
    trackUpload,
}: IProps) => {
    const { data } = useSession();
    const onDrop = useCallback(
        async (acceptedFiles: FileWithPath[]) => {
            if (acceptedFiles && acceptedFiles[0]) {
                const audio = acceptedFiles[0];
                const formData = new FormData();
                formData.append("fileUpload", audio);

                try {
                    const res = await axios.post(
                        "http://localhost:8000/api/v1/files/upload",
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${data?.access_token}`,
                                target_type: "tracks",
                            },
                            onUploadProgress: (progressEvent) => {
                                let percentCompleted = Math.floor(
                                    (progressEvent.loaded * 100) /
                                        progressEvent.total!
                                );
                                setTrackUpload({
                                    ...trackUpload,
                                    fileName: acceptedFiles[0].name,
                                    percent: percentCompleted,
                                }); // do whatever you like with the percentage complete
                                // maybe dispatch an action that will update a progress bar or something
                            },
                        }
                    );
                    setTrackUpload((prev: any) => ({
                        ...prev,
                        uploadedTrackName: res.data.data.fileName,
                    }));

                    if (res.data && res) {
                        setOpenStep1(false);
                    }
                } catch (error) {
                    console.log("error", error);
                }
            }
        },
        [data]
    );
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "audio/wav": [".wav"],
            "audio/flac": [".flac"],
            "audio/aiff": [".aiff"],
            "audio/alac": [".alac"],
        },
    });
    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    return (
        <Container>
            <section className="container">
                <div style={{ marginBottom: 23 }}>
                    <h1 style={{ fontSize: "28px" }}>
                        Upload your audio files
                    </h1>
                    <p>
                        For best quality, use WAV, FLAC, AIFF, or ALAC. The
                        maximum file size is 4GB uncompressed. Learn more.
                    </p>
                </div>
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Image
                        src="/assets/photo/upload-icon.svg"
                        alt="icon"
                        width={80}
                        height={80}
                    />
                    <p style={{ fontWeight: 600, color: "black" }}>
                        Drag and drop audio files to get started.
                    </p>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        onClick={(e) => {
                            e.preventDefault();
                            // setOpenStep1(false);
                        }}
                        style={{
                            fontWeight: 700,
                            fontSize: 14,
                            borderRadius: 50,
                            padding: "10px 20px",
                            textTransform: "none",
                            background: "black",
                        }}
                    >
                        Choose files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) =>
                                console.log(event.target.files)
                            }
                            multiple
                        />
                    </Button>
                </div>
            </section>
        </Container>
    );
};
export default UploadStep1;

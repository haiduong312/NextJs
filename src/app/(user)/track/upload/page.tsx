"use client";
import { useEffect, useState } from "react";
import UploadStep1 from "@/components/upload/upload.step1";
import UploadStep2 from "@/components/upload/upload.step2";
import useLocalStorage from "@/utils/customeHook";

const UploadPage = () => {
    const [openStep1, setOpenStep1] = useLocalStorage<boolean>(
        "upload-step",
        true
    );
    const [trackUpload, setTrackUpload] = useLocalStorage<{
        percent: number;
        fileName: string;
        uploadedTrackName: string;
    }>("track-upload", {
        percent: 0,
        fileName: "",
        uploadedTrackName: "",
    });
    return (
        <div>
            {openStep1 ? (
                <UploadStep1
                    openStep1={openStep1}
                    setOpenStep1={setOpenStep1}
                    setTrackUpload={setTrackUpload}
                    trackUpload={trackUpload}
                />
            ) : (
                <UploadStep2
                    openStep1={openStep1}
                    setOpenStep1={setOpenStep1}
                    trackUpload={trackUpload}
                />
            )}
        </div>
    );
};
export default UploadPage;

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

    return (
        <div>
            {openStep1 ? (
                <UploadStep1
                    openStep1={openStep1}
                    setOpenStep1={setOpenStep1}
                />
            ) : (
                <UploadStep2
                    openStep1={openStep1}
                    setOpenStep1={setOpenStep1}
                />
            )}
        </div>
    );
};
export default UploadPage;

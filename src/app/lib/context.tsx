"use client";

import { createContext, useContext, useState } from "react";

export const TrackContext = createContext<ITrackContext | null>(null);

export const TrackContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const initialValue = {
        _id: "",
        title: "",
        description: "",
        category: "",
        imgUrl: "",
        trackUrl: "",
        countLike: 0,
        countPlay: 0,
        uploader: {
            _id: "",
            email: "",
            name: "",
            role: "",
            type: "",
        },
        isDeleted: true,
        isPlaying: false,
        createdAt: new Date("2025-08-16T04:56:27.205Z"),
        updatedAt: new Date("2025-08-16T04:56:27.205Z"),
    };
    const [currentTrack, setCurrentTrack] = useState<IShareTrack>(initialValue);

    return (
        <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
            {children}
        </TrackContext.Provider>
    );
};

export const useTrackContext = () => useContext(TrackContext);

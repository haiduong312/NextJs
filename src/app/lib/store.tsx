import { create } from "zustand";
interface TrackState {
    currentTrack: IShareTrack;
    setCurrentTrack: (track: IShareTrack) => void;
}
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
export const useTrackStore = create<TrackState>((set) => ({
    currentTrack: initialValue,
    isPlaying: false,
    setCurrentTrack: () => {
        set((state) => {
            console.log(state);
            return {
                currentTrack: {
                    ...state.currentTrack,
                    isPlaying: !state.currentTrack.isPlaying,
                },
            };
        });
    },
}));

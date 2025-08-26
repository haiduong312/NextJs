"use client";
import WaveTrack from "@/components/tracks/wave.track";
import { useSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
    const searchParams = useSearchParams();
    const search = searchParams.get("audio");
    return (
        <Container>
            <div>
                <WaveTrack />
            </div>
        </Container>
    );
};
export default DetailTrackPage;

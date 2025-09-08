import WaveTrack from "@/components/tracks/wave.track";
import { sendRequest } from "@/utils/api";
import Container from "@mui/material/Container";
const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
        method: "GET",
    });

    return (
        <Container>
            <div>
                <WaveTrack track={res?.data ?? null} />
            </div>
        </Container>
    );
};
export default DetailTrackPage;

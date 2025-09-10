import WaveTrack from "@/components/tracks/wave.track";
import { sendRequest } from "@/utils/api";
import Container from "@mui/material/Container";
const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
        method: "GET",
    });

    const resComment = await sendRequest<
        IBackendRes<IModelPaginate<ITrackComment>>
    >({
        url: `http://localhost:8000/api/v1/tracks/comments`,
        method: "POST",
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: params.slug,
            sort: "-createdAt",
        },
    });
    console.log("resabc", resComment);
    return (
        <Container>
            <div>
                <WaveTrack
                    track={res?.data ?? null}
                    comment={resComment?.data?.result ?? []}
                />
            </div>
        </Container>
    );
};
export default DetailTrackPage;

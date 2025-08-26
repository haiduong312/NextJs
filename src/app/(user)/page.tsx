import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const HomePage = async () => {
    const session = await getServerSession(authOptions);
    console.log("check", session);
    const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: "http://localhost:8000/api/v1/tracks/top",
        method: "POST",
        body: {
            category: "CHILL",
            limit: 10,
        },
    });

    const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: "http://localhost:8000/api/v1/tracks/top",
        method: "POST",
        body: {
            category: "WORKOUT",
            limit: 10,
        },
    });
    const party = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: "http://localhost:8000/api/v1/tracks/top",
        method: "POST",
        body: {
            category: "PARTY",
            limit: 10,
        },
    });
    return (
        <Container>
            <MainSlider data={chill?.data ?? []} title="Top Chill" />
            <MainSlider data={workouts?.data ?? []} title="Top Workout" />
            <MainSlider data={party?.data ?? []} title="Top Party" />
        </Container>
    );
};
export default HomePage;

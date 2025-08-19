import Header from "@/components/header/app.header";
import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";

const HomePage = async () => {
    // const res = await fetch("http://localhost:8000/api/v1/tracks/top", {
    //     method: "POST",
    //     headers: {
    //         "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         category: "CHILL",
    //         limit: 10,
    //     }),
    // });
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

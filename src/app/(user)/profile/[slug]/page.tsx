import TrackProfile from "@/components/header/profile.tracks";
import { sendRequest } from "@/utils/api";
import { Container, Grid } from "@mui/material";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
    const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: "http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10",
        method: "POST",
        body: {
            id: params.slug,
        },
    });
    const data = res?.data?.result ?? [];

    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={5}>
                {data.map((item: ITrackTop, index: number) => (
                    <Grid item xs={12} md={6} key={index}>
                        <TrackProfile data={item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProfilePage;

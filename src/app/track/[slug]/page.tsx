import WaveTrack from "@/components/tracks/wave.track";
import { sendRequest } from "@/utils/api";
import Container from "@mui/material/Container";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: { slug: string };
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const initSlug = params.slug.split(".html") ?? [];
    const splitSlug = (initSlug[0].split("-") ?? []) as string[];
    const id = splitSlug[splitSlug.length - 1];
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: "GET",
    });

    return {
        title: res.data?.title,
        description: res?.data?.description,
        openGraph: {
            title: "Hỏi Dân IT",
            description: "Beyond Your Coding Skills",
            type: "website",
            images: [
                `https://raw.githubusercontent.com/hoidanit/images-hosting/master/eric.png`,
            ],
        },
    };
}

export async function generateStaticParams() {
    return [
        { slug: "nu-hon-bisou-68a00f7b09646e0c828487dc.html" },
        { slug: "le-luu-ly-68a00f7b09646e0c828487df.html" },
        { slug: "truy-lung-bao-vat-68a00f7b09646e0c828487db.html" },
    ];
}

const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {
    const initSlug = params.slug.split(".html") ?? [];
    const splitSlug = (initSlug[0].split("-") ?? []) as string[];
    const id = splitSlug[splitSlug.length - 1];
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: "GET",
        // nextOption: { cache: "no-store" },
    });

    const resComment = await sendRequest<
        IBackendRes<IModelPaginate<ITrackComment>>
    >({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
        method: "POST",
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: id,
            sort: "-createdAt",
        },
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (!res.data) {
        notFound();
    }
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

"use client";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ClientSearch = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [result, setResult] = useState<ITrackTop[]>([]);
    const searchResult = async (query: string) => {
        const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/search`,
            method: "POST",
            body: {
                current: 1,
                pageSize: 10,
                title: query,
            },
        });
        console.log(res.data?.result);
        if (res.data && res) {
            setResult(res.data.result);
        }
    };
    useEffect(() => {
        document.title = `${query} results on SC`;
        if (query) {
            searchResult(query);
        }
    }, [searchParams]);

    return (
        <Container style={{ padding: "24px" }}>
            {result.length === 0 ? (
                <p>Nothing.</p>
            ) : (
                result.map((item) => (
                    <div
                        key={item._id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            padding: "12px",
                            marginBottom: "12px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            transition: "all 0.2s ease-in-out",
                        }}
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                            alt={item.title}
                            style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "6px",
                                flexShrink: 0,
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <h3
                                style={{
                                    margin: "0 0 4px 0",
                                    fontSize: "18px",
                                }}
                            >
                                {item.title}
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "14px",
                                    color: "#666",
                                }}
                            >
                                {item.uploader?.name} • {item.category}
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "16px",
                                    marginTop: "6px",
                                    fontSize: "14px",
                                    color: "#444",
                                }}
                            >
                                <span>❤ {item.countLike}</span>
                                <span>▶ {item.countPlay}</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </Container>
    );
};
export default ClientSearch;

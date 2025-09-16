"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Divider } from "@mui/material";
import Link from "next/link";
import { convertSlugUrl } from "@/utils/api";
import Image from "next/image";
interface IProps {
    data: ITrackTop[];
    title: string;
}
const MainSlider = ({ data, title }: IProps) => {
    const NextArrow = (props: any) => {
        return (
            <Button
                variant="contained"
                color="inherit"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
                }}
            >
                <ChevronRightIcon />
            </Button>
        );
    };
    const PreArrow = (props: any) => {
        return (
            <Button
                variant="contained"
                color="inherit"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    left: 0,
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
                }}
            >
                <ChevronLeftIcon />
            </Button>
        );
    };
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PreArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Box
            sx={{
                margin: "0 50px",
                ".track": {
                    padding: "0 10px",
                },
                h3: {
                    border: "1px solid #ccc",
                    padding: "20px",
                    height: "200px",
                },
            }}
        >
            <h2>{title}</h2>
            <Slider {...settings}>
                {data.map((item, index) => {
                    return (
                        <div
                            style={{
                                position: "relative",
                                height: "360px",
                                width: "100%",
                            }}
                            key={index}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                                alt="image"
                                width={200}
                                height={180}
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                            <Link
                                href={`/track/${convertSlugUrl(item.title)}-${
                                    item._id
                                }.html?audio=${item.trackUrl}`}
                                style={{
                                    textDecoration: "none",
                                    color: "unset",
                                }}
                            >
                                <h4>{item.title}</h4>
                            </Link>
                            <h5>{item.description}</h5>
                        </div>
                    );
                })}
            </Slider>
            <Divider />
        </Box>
    );
};
export default MainSlider;

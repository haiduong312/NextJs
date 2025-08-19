"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Divider } from "@mui/material";
import Link from "next/link";

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
                        <div className="track" key={index}>
                            <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                                alt=""
                                style={{ width: 180, height: 160 }}
                            />
                            <Link
                                href={`/track/${item._id}?audio=${item.trackUrl}`}
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

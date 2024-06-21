import { Box, IconButton, useMediaQuery } from "@mui/material";
import carousel1 from "../../../assets/carousels/carousel1.png";
import carousel2 from "../../../assets/carousels/carousel2.jpg";
import carousel3 from "../../../assets/carousels/carousel3.jpg";
import styled from "styled-components";
import { ReactNode, useEffect, useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const IconButtonCarousel = styled(IconButton) ({
    position: "absolute",
    top: "40%",
    zIndex: 2,
    mr: 2,
    color: "#fff",
    background: "rgba(0,0,0,0.5)",
    transition: "background-color 1.5s ease-in-out",
    "&:hover": {
        backgroundColor: "rgba(0,0,0,0.8)",
    }
});

const images = [
    carousel1,
    carousel2,
    carousel3
]
const CarouselBackground = styled(Box)({
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    position: "relative",
    transition: "background-image 1.5s ease-in, opacity 1.5s ease-in-out",
    zIndex: 1,
    "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: -1,
    }
});

type Props = {
    children?: ReactNode;
}

const Carousel = ({children} : Props) => {
    const [viewIndex, setViewIndex] = useState<number>(0);
    const isMobile: boolean = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const timeoutId = setInterval(() => {
            setViewIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);

        return () => {
            clearInterval(timeoutId);
        };
    }, [viewIndex]);

    return (
        <CarouselBackground sx={{
            backgroundImage: `url(${images[viewIndex]})`,
            height: isMobile ? '200px': '400px'
        }}>
            <IconButton sx={{
                position: "absolute",
                top: "40%",
                zIndex: 2,
                ml: 2,
                color: "#fff",
                background: "rgba(0,0,0,0.5)",
                transition: "background-color 1.5s ease-in-out",
                "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.8)",
                }
            }} onClick={() => setViewIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
            ><ArrowBackIosNewIcon/></IconButton>
            {children}
            <IconButton sx={{
                position: "absolute",
                top: "40%",
                right: 0,
                zIndex: 2,
                mr: 2,
                color: "#fff",
                background: "rgba(0,0,0,0.5)",
                transition: "background-color 1.5s ease-in-out",
                "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.8)",
                }
            }} onClick={() => setViewIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
            ><ArrowForwardIosIcon/></IconButton>
        </CarouselBackground>
    )
}

export default Carousel;
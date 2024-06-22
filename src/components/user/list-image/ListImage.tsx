import { Box, IconButton, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductImageModel } from "../../../models/product-image.model";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
    images: ProductImageModel[];
}

type PageImage = {
    pageNo: number;
    totalPages: number;
    items: ProductImageModel[];
}


const ListImage = ({ images }: Props) => {
    const [active, setActive] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(0);
    const isMobile: boolean = useMediaQuery('(max-width:600px)');

    const [pageImage, setPageImage] = useState<PageImage>();
    const [currentPage, setCurrentPage] = useState<number>(1);


    const handleNextPage = (pageNo: number, pageSize: number) => {
        setPageImage({
            pageNo: pageNo,
            totalPages: Math.ceil(images.length / pageSize),
            items: images.slice((pageNo - 1) * pageSize, pageSize + ((pageNo - 1) * pageSize))
        })
    }


    useEffect(() => {
        handleNextPage(currentPage, 5);
    }, [images, currentPage]);



    const nextImage = () => {
        setActive(prev => prev + 1);
        setActivePage(prev => prev + 1);
        if (activePage + 1 >= 5) {
            setCurrentPage(prev => prev + 1);
            setActivePage(0);
        }
    }

    const prevImage = () => {
        setActive(prev => prev - 1);
        setActivePage(prev => prev - 1);
        if (activePage - 1 < 0) {
            setCurrentPage(prev => prev - 1);
            setActivePage(4);
        }
    }


    return (
        <Box sx={{ width: '50%', flexGrow: 1 }}>
            <Box sx={{
                width: "100%",
                height: isMobile ? "300px" : "400px",
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    position: 'relative'
                }}>
                    <Box sx={{
                        display: 'flex',
                        transition: 'transform 0.5s ease',
                        transform: `translateX(-${active * 100}%)`,
                    }}>
                        {images.map((image: ProductImageModel) => (
                            <Box
                                component="img"
                                key={image.id}
                                src={image.path || ""}
                                alt="image"
                                sx={{ width: '100%', height: isMobile ? '300px' : '400px', flexShrink: 0, }}
                            />
                        ))}

                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        color: "#fff",
                        background: "rgba(0,0,0,0.5)",
                        p: 1,
                        borderRadius: '0px 5px 0px 0px'
                    }}>
                        {active + 1}/{images.length}
                    </Box>
                </Box>

                {active < images.length - 1 && <IconButton sx={{
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
                }} onClick={nextImage}>
                    <ArrowForwardIosIcon />
                </IconButton>}


                {active > 0 && <IconButton sx={{
                    position: "absolute",
                    top: "40%",
                    left: 0,
                    zIndex: 2,
                    mr: 2,
                    color: "#fff",
                    background: "rgba(0,0,0,0.5)",
                    transition: "background-color 1.5s ease-in-out",
                    "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.8)",
                    }
                }} onClick={prevImage}>
                    <ArrowBackIosNewIcon />
                </IconButton>}

            </Box>
            <Box sx={{ gap: '8px', marginTop: '8px', width: "100%", display: 'inline-flex' }}>
                {pageImage && pageImage.items.map((image: ProductImageModel, index: number) => (
                    <Box
                        sx={{
                            height: '100px',
                            flexBasis: '150px',
                            border: index === activePage ? '3px solid red' : 'none',
                            cursor: 'pointer'
                        }}
                        key={image.id}
                        onClick={() => { setActive(index + 5 * (currentPage - 1)); setActivePage(index) }}
                    >
                        <img src={image.path ?? ""} alt="image" height={'100%'} width={'100%'} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default ListImage;

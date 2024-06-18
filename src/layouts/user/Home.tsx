import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material";
import Carousel from "../../components/user/carousels/Carousel";
import ProductCard from "../../components/user/cards/ProductCard";

const Home = () => {
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    return (
        <Box sx={{ width: '100%' }}>
            <Carousel></Carousel>
            <Container>
                <Typography>Khuyến mãi hot</Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '30px',
                    flexWrap: 'wrap',
                }}>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}><Button>Xem thêm</Button></Box>
                <Typography>Sản phẩm bán chạy</Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '30px',
                    flexWrap: 'wrap',
                }}>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}><Button>Xem thêm</Button></Box>
                <Typography>Sản phẩm mới</Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '30px',
                    flexWrap: 'wrap',
                }}>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                   <Box sx={{flexBasis: isMobile ? '150px' : '345px', flexGrow: 1, flexShrink: 1}}>
                        <ProductCard></ProductCard>
                   </Box>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}><Button>Xem thêm</Button></Box>
            </Container>
            
        </Box>
    )
}

export default Home;
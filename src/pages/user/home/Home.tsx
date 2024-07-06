import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material";
import Carousel from "../../../components/user/carousels/Carousel";
import ProductCard from "../../../components/user/cards/ProductCard";
import { useEffect, useState } from "react";
import {getPageProducts } from "../../../services/product.service";
import { ProductUserResponse } from "../../../dtos/responses/product-user-response";


const Home = () => {
     const [productSales, setProductSales] = useState<ProductUserResponse[]>([]);

     useEffect(() => {
          const fetchData = async () => {
               const response = await getPageProducts();
               if (response.status === 200) {
                    setProductSales(response.data.data);
               }
          };
          fetchData();
     }, []);
     const isMobile: boolean = useMediaQuery('(max-width:600px)');
     return (
          <Box sx={{ width: '100%' }}>
               <Carousel></Carousel>
               {productSales.length > 0 && <Container>
                    <Typography>Khuyến mãi hot</Typography>
                    <Box sx={{
                         display: 'flex',
                         gap: '30px',
                         flexWrap: 'wrap',
                         justifyContent: 'center'
                    }}>
                         {productSales.map((product: ProductUserResponse) => (
                              <Box key={product.product.id} sx={{ flexBasis: isMobile ? '100px' : '250px', flexGrow: 1, maxWidth: isMobile ? '150px' : '250px' }}>
                                   <ProductCard product={product}></ProductCard>
                              </Box>
                         ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}><Button>Xem thêm</Button></Box>
               </Container>}

          </Box>
     )
}

export default Home;
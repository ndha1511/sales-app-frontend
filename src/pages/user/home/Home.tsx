import { Box, Button, Container } from "@mui/material";
import Carousel from "../../../components/user/carousels/Carousel";
import { useEffect, useState } from "react";
import { getPageProducts } from "../../../services/product.service";
import { ProductUserResponse } from "../../../dtos/responses/product-user-response";
import ListProduct from "../products/ListProduct";


const Home = () => {
     const [productSales, setProductSales] = useState<ProductUserResponse[]>([]);
     const [bestSellingProducts, setBestSellingProducts] = useState<ProductUserResponse[]>([]);

     useEffect(() => {
          const fetchData = async () => {
               window.scrollTo({ top: 0, behavior: 'smooth' });
               const response = await getPageProducts(1, 20);
               if (response.status === 200) {
                    setProductSales(response.data.data);
               }
          };
          fetchData();
     }, []);
     return (
          <Box sx={{ width: '100%' }}>
               <Carousel>
                    <Button variant="outlined" size="large" color="inherit">MUA NGAY</Button>
               </Carousel>
               <Container sx={{
                    mt: 2,
                    display: 'flex',
                    gap: '20px',
                    flexDirection: 'column',
                    mb: 4
               }}>
                    <Box>
                         {productSales.length > 0 &&
                              <ListProduct products={productSales} title="Khuyến mãi hot" applyCss={true} />
                         }
                         <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                              <Button variant="contained" color="inherit">Xem thêm</Button>
                         </Box>
                    </Box>
                    <Box>
                         {productSales.length > 0 &&
                              <ListProduct products={productSales} title="Sản phẩm bán chạy" applyCss={true} />
                         }
                         <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                              <Button variant="contained" color="inherit">Xem thêm</Button>
                         </Box>
                    </Box>
                    <Box>
                         {productSales.length > 0 &&
                              <ListProduct products={productSales} title="Sản phẩm được nhiều người đánh giá" applyCss={true} />
                         }
                         <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                              <Button variant="contained" color="inherit">Xem thêm</Button>
                         </Box>
                    </Box>
               </Container>

          </Box>
     )
}

export default Home;
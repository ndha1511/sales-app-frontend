import { useEffect, useState } from "react";
import { ProductUserResponse } from "../../../dtos/responses/product-user-response";
import { getPageProducts } from "../../../services/product.service";
import { Pagination, Typography, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import ProductCard from "../../../components/user/cards/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
    const [productSales, setProductSales] = useState<ProductUserResponse[]>([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [totalPage, setTotalPage] = useState(1);
    const pageNo = queryParams.get("pageNo") ? Number(queryParams.get("pageNo")) : 1;
    const [pageNoState, setPageNoState] = useState(pageNo);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
             const response = await getPageProducts(pageNoState);
             console.log(response);
             if (response.status === 200) {
                  setProductSales(response.data.data);
                  setTotalPage(response.data.totalPage);
             }
        };
        fetchData();
   }, [pageNoState]);
   const isMobile: boolean = useMediaQuery('(max-width:600px)');
   const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
     setPageNoState(value);
     navigate('?pageNo=' + value);
   };
   return (
        <Box sx={{ width: '100%' }}>
             {productSales.length > 0 && <Container>
                  <Typography>Danh sách sản phẩm</Typography>
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
                  {totalPage > 1 && <Pagination count={totalPage} page={pageNo} variant="outlined" shape="rounded" 
                    onChange={handleChange}
                  />}
             </Container>}

        </Box>
   )
}

export default Product;
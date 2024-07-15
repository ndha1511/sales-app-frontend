import {
    Box, Pagination,
    Select, Stack,
    Typography,
    useMediaQuery,

} from "@mui/material";
import SearchInput from "../../../components/common/search-input/SearchInput.tsx";
import ButtonGradient from "../../../components/common/ButtonGradient.tsx";
import {pinkGradient} from "../../../theme.tsx";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import ProductCard from "../../../components/admin/cards/ProductCard.tsx";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/product.service.ts";
import { ResponseSuccess } from "../../../dtos/responses/response.success.ts";
import { ProductModel } from "../../../models/product.model.ts";


const Product = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    const fNavigate = (id: number) => {
        navigate('update/' + id);
    }
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProductModel[]> = await getAllProducts();
                setProducts(response.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return <Box sx={{display: 'flex', flexDirection: 'column', p: 2}}>
        <Box  sx={{display: 'flex', width: '100%', justifyContent: 'flex-end', mb: 2}}>
            <Typography component="span" sx={{flexGrow: 1}}>Danh sách sản phẩm</Typography>
            <ButtonGradient size="small" sx={{
                background: pinkGradient,
                color: "#fff",
                fontSize: 10
            }} onClick={() => navigate("create")}>Thêm sản phẩm <AddIcon/> </ButtonGradient>
        </Box>
        <Box sx={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", mb: 3
        }}>
            <Box><SearchInput placeHolder={"Nhập tên sản phẩm"}/></Box>
            <Box>
                <Select size={"small"}></Select>
                <Select size={"small"}></Select>
                <Select size={"small"}></Select>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            p: 0.5
        }}>
            {products.map((item: ProductModel, index: number) => (
                <Box sx={{width: isMobile ? '150px' : '270px'}} key={index}>
                    <ProductCard
                        productId={item.id ?? 0}
                        productName={item.productName ?? ''}
                        productPrice={item.price ?? 0}
                        fNavigate={fNavigate}
                        thumbnail={item.thumbnail ?? ''}
                    />
                </Box>
            ))}
        </Box>
        <Box sx={{
            display: 'flex', alignItems: 'center',
            width: '100%', justifyContent: 'flex-end',
            mt: 2
        }}>
            <Stack spacing={2}>
                <Pagination count={10} variant="outlined" color={"primary"}/>
            </Stack>
        </Box>
    </Box>
}

export default Product;